import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { initiateRazorpayRefund } from '@/lib/payments/razorpay';

export async function GET() {
  try {
    const refunds = db.getRefunds();
    return NextResponse.json({ refunds });
  } catch (err: unknown) {
    console.error('[API Refunds GET Error]', err);
    return NextResponse.json({ error: 'Failed to fetch refunds' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, bookingId, amount, reason, requestedBy } = body;

    if (!paymentId || !amount || !reason) {
      return NextResponse.json({ error: 'Missing required refund fields' }, { status: 400 });
    }

    const refund = db.requestRefund({
      paymentId,
      bookingId: bookingId || '',
      amount: Number(amount),
      reason,
      requestedBy: requestedBy || 'Admin'
    });

    return NextResponse.json({ success: true, refund });
  } catch (err: unknown) {
    console.error('[API Refunds POST Error]', err);
    return NextResponse.json({ error: 'Failed to request refund' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { refundId, approvedBy } = body;

    if (!refundId) {
      return NextResponse.json({ error: 'Missing refundId' }, { status: 400 });
    }

    const allRefunds = db.getRefunds();
    const target = allRefunds.find((r) => r.id === refundId);
    if (!target) {
      return NextResponse.json({ error: 'Refund record not found' }, { status: 404 });
    }

    // Call Razorpay refund API
    const rzpRefund = await initiateRazorpayRefund({
      paymentId: target.paymentId,
      amountInINR: target.amount,
      reason: target.reason
    });

    const approved = db.approveRefund(refundId, approvedBy || 'Super Admin', rzpRefund.id);

    return NextResponse.json({
      success: true,
      message: 'Refund approved and processed via Razorpay',
      refund: approved
    });
  } catch (err: unknown) {
    console.error('[API Refunds PATCH Error]', err);
    return NextResponse.json({ error: 'Refund approval failed' }, { status: 500 });
  }
}
