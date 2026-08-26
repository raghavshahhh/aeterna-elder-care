import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifyPaymentSignature } from '@/lib/payments/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookingId,
      installmentId,
      amount,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod
    } = body;

    if (!bookingId || !razorpayPaymentId || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters (bookingId, razorpayPaymentId, amount)' },
        { status: 400 }
      );
    }

    // 1. Enforce Signature Verification for Razorpay checkout payments
    if (!razorpayOrderId || !razorpaySignature) {
      return NextResponse.json(
        { error: 'Missing Razorpay orderId or payment signature for verification.' },
        { status: 400 }
      );
    }

    const isValid = verifyPaymentSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature
    });

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid Razorpay payment signature. Payment rejected.' }, { status: 400 });
    }


    // 2. Perform Atomic Verification & Complete Payment in Repository
    const result = db.verifyAndCompletePayment({
      bookingId,
      installmentId,
      amount: Number(amount),
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod: paymentMethod || 'RAZORPAY_UPI',
      isWebhook: false
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and ledger updated successfully.',
      payment: result.payment,
      receipt: result.receipt,
      booking: result.booking,
      plan: result.plan
    });
  } catch (err: unknown) {
    console.error('[API payment verify Error]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Payment verification failed' },
      { status: 500 }
    );
  }
}
