import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifyWebhookSignature } from '@/lib/payments/razorpay';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    // 1. Verify Webhook Signature
    const isValidSignature = verifyWebhookSignature(rawBody, signature);
    if (!isValidSignature && process.env.NODE_ENV === 'production') {
      console.warn('[Webhook] Invalid Razorpay webhook signature');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    console.log(`[Razorpay Webhook Event Received]: ${event}`);

    // -------------------------------------------------------------
    // EVENT: payment.captured or payment_link.paid
    // -------------------------------------------------------------
    if (event === 'payment.captured' || event === 'payment_link.paid') {
      const paymentEntity = payload.payload?.payment?.entity || payload.payload?.payment_link?.entity;
      if (!paymentEntity) {
        return NextResponse.json({ status: 'ignored', reason: 'No payment entity found' });
      }

      const paymentId = paymentEntity.id;
      const orderId = paymentEntity.order_id;
      const amountInINR = (paymentEntity.amount || 0) / 100;
      const notes = paymentEntity.notes || {};
      const bookingId = notes.bookingId;
      const installmentId = notes.installmentId;

      // Idempotency check: Has this payment ID already been captured?
      const existingPayment = db.getPaymentById(paymentId);
      if (existingPayment && existingPayment.status === 'CAPTURED') {
        console.log(`[Webhook Idempotency] Payment ${paymentId} already captured.`);
        return NextResponse.json({ status: 'already_processed', paymentId });
      }

      if (bookingId) {
        db.verifyAndCompletePayment({
          bookingId,
          installmentId: installmentId && installmentId !== 'FULL_PAYMENT' ? installmentId : undefined,
          amount: amountInINR,
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          paymentMethod: 'RAZORPAY_UPI',
          isWebhook: true
        });
      }
    }

    // -------------------------------------------------------------
    // EVENT: payment.failed
    // -------------------------------------------------------------
    if (event === 'payment.failed') {
      const paymentEntity = payload.payload?.payment?.entity;
      if (paymentEntity) {
        const bookingId = paymentEntity.notes?.bookingId;
        if (bookingId) {
          db.recordPayment({
            id: `PAY-${Date.now().toString().slice(-6)}`,
            receiptNumber: `FAIL-${Date.now().toString().slice(-4)}`,
            bookingId,
            buyerName: paymentEntity.notes?.customerName || 'Customer',
            buyerEmail: paymentEntity.email || '',
            buyerPhone: paymentEntity.contact || '',
            projectId: '',
            locationId: '',
            unitId: paymentEntity.notes?.unitCode || '',
            unitCode: paymentEntity.notes?.unitCode || '',
            amount: (paymentEntity.amount || 0) / 100,
            amountPaid: 0,
            currency: 'INR',
            method: 'RAZORPAY_UPI',
            status: 'FAILED',
            razorpayOrderId: paymentEntity.order_id,
            razorpayPaymentId: paymentEntity.id,
            webhookVerified: true,
            failureReason: paymentEntity.error_description || 'Payment authorization failed at bank',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      }
    }

    return NextResponse.json({ status: 'success', event });
  } catch (err: unknown) {
    console.error('[Razorpay Webhook Processing Error]', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
