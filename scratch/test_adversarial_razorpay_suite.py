import hmac
import hashlib
import json
import urllib.request
import urllib.error

BASE_URL = "http://localhost:3050"
SECRET = "secret_seniorliving_mock2026"
WEBHOOK_SECRET = "whsec_seniorliving_mock2026"

def calculate_signature(order_id: str, payment_id: str, secret: str) -> str:
    body = f"{order_id}|{payment_id}".encode('utf-8')
    return hmac.new(secret.encode('utf-8'), body, hashlib.sha256).hexdigest()

def calculate_webhook_signature(payload: str, secret: str) -> str:
    return hmac.new(secret.encode('utf-8'), payload.encode('utf-8'), hashlib.sha256).hexdigest()

def make_request(path: str, data: dict, headers: dict = None):
    url = f"{BASE_URL}{path}"
    body = json.dumps(data).encode('utf-8')
    req_headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Host': 'localhost:3050'
    }
    if headers:
        req_headers.update(headers)
    req = urllib.request.Request(url, data=body, headers=req_headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            raw = response.read().decode('utf-8')
            try:
                return response.status, json.loads(raw)
            except:
                return response.status, {"raw": raw}
    except urllib.error.HTTPError as e:
        raw = e.read().decode('utf-8')
        try:
            return e.code, json.loads(raw)
        except:
            return e.code, {"error": raw}

def run_adversarial_tests():
    print("==================================================")
    print("SLCF ADVERSARIAL PAYMENT & WEBHOOK SECURITY TEST SUITE")
    print("==================================================")

    test_booking_id = "BK-598126" # Active hold booking in database
    order_id = "order_audit_test_9999"
    payment_id = "pay_audit_test_9999"
    valid_sig = calculate_signature(order_id, payment_id, SECRET)
    invalid_sig = "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90"

    results = []

    # 1. Missing signature
    status, res = make_request("/api/payments/verify", {
        "bookingId": test_booking_id,
        "amount": 270000,
        "razorpayOrderId": order_id,
        "razorpayPaymentId": payment_id
    })
    passed = (status == 400)
    results.append(("1. Missing signature rejected (400)", passed, status, res))

    # 2. Missing orderId
    status, res = make_request("/api/payments/verify", {
        "bookingId": test_booking_id,
        "amount": 270000,
        "razorpayPaymentId": payment_id,
        "razorpaySignature": valid_sig
    })
    passed = (status == 400)
    results.append(("2. Missing orderId rejected (400)", passed, status, res))

    # 3. Correct order + Wrong signature
    status, res = make_request("/api/payments/verify", {
        "bookingId": test_booking_id,
        "amount": 270000,
        "razorpayOrderId": order_id,
        "razorpayPaymentId": payment_id,
        "razorpaySignature": invalid_sig
    })
    passed = (status == 400 and "Invalid" in str(res))
    results.append(("3. Wrong cryptographic signature rejected (400)", passed, status, res))

    # 4. Wrong order + Signature for another order
    other_order_id = "order_audit_test_8888"
    other_sig = calculate_signature(other_order_id, payment_id, SECRET)
    status, res = make_request("/api/payments/verify", {
        "bookingId": test_booking_id,
        "amount": 270000,
        "razorpayOrderId": order_id, # mismatch
        "razorpayPaymentId": payment_id,
        "razorpaySignature": other_sig
    })
    passed = (status == 400 and "Invalid" in str(res))
    results.append(("4. Mismatched order/signature rejected (400)", passed, status, res))

    # 5. Correct order + Correct signature (Positive Test)
    status, res = make_request("/api/payments/verify", {
        "bookingId": test_booking_id,
        "amount": 270000,
        "razorpayOrderId": order_id,
        "razorpayPaymentId": payment_id,
        "razorpaySignature": valid_sig
    })
    passed = (status == 200 and res.get("success") == True)
    results.append(("5. Valid HMAC-SHA256 signature accepted (200)", passed, status, res))

    # 6. Replay attack with same paymentId (Idempotency Test)
    status, res_replay = make_request("/api/payments/verify", {
        "bookingId": test_booking_id,
        "amount": 270000,
        "razorpayOrderId": order_id,
        "razorpayPaymentId": payment_id,
        "razorpaySignature": valid_sig
    })
    passed = (status == 200 and res_replay.get("payment", {}).get("razorpayPaymentId") == payment_id)
    results.append(("6. Duplicate payment verification is idempotent (200)", passed, status, res_replay))

    # 7. Webhook with invalid HMAC signature
    wh_payload = {
        "entity": "event",
        "event": "payment.captured",
        "payload": {
            "payment": {
                "entity": {
                    "id": "pay_wh_test_1001",
                    "order_id": "order_wh_test_1001",
                    "amount": 27000000,
                    "currency": "INR",
                    "status": "captured",
                    "notes": {"bookingId": test_booking_id}
                }
            }
        }
    }
    wh_raw = json.dumps(wh_payload)
    status, res = make_request("/api/payments/razorpay/webhook", wh_payload, {"x-razorpay-signature": "bad_wh_sig"})
    passed = (status == 400)
    results.append(("7. Invalid webhook HMAC rejected (400)", passed, status, res))

    # 8. Webhook with valid HMAC signature
    wh_sig = calculate_webhook_signature(wh_raw, WEBHOOK_SECRET)
    status, res = make_request("/api/payments/razorpay/webhook", wh_payload, {"x-razorpay-signature": wh_sig})
    passed = (status == 200 and res.get("success") == True)
    results.append(("8. Valid webhook HMAC processed (200)", passed, status, res))

    # 9. Duplicate Webhook (Idempotency)
    status, res = make_request("/api/payments/razorpay/webhook", wh_payload, {"x-razorpay-signature": wh_sig})
    passed = (status == 200 and res.get("success") == True)
    results.append(("9. Duplicate webhook replay is idempotent (200)", passed, status, res))

    print("\n--- TEST EXECUTION SUMMARY ---")
    all_passed = True
    for title, passed, status, detail in results:
        mark = "✅ PASS" if passed else "❌ FAIL"
        if not passed:
            all_passed = False
        print(f"{mark} | {title} (HTTP {status})")

    print("--------------------------------------------------")
    if all_passed:
        print("ALL 9 ADVERSARIAL PAYMENT & WEBHOOK TESTS PASSED!")
    else:
        print("SOME TESTS FAILED! INSPECT RESULTS.")

if __name__ == "__main__":
    run_adversarial_tests()
