import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { initiateRazorpayRefund } from '@/lib/payments/razorpay';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('slcf_session')?.value || req.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 401 });
    }

    const refunds = db.getRefunds();
    return NextResponse.json({ refunds });
  } catch (err: unknown) {
    console.error('[API Refunds GET Error]', err);
    return NextResponse.json({ error: 'Failed to fetch refunds' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('slcf_session')?.value || req.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 401 });
    }

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
      requestedBy: requestedBy || user.name || 'Admin'
    });

    db.logAction(
      'REFUND_REQUESTED',
      'PAYMENT',
      paymentId,
      `Refund requested for ₹${amount} on payment ${paymentId}: ${reason} (Refund ID: ${refund.id})`,
      { id: user.id, name: user.name, role: user.role }
    );

    return NextResponse.json({ success: true, refund });
  } catch (err: unknown) {
    console.error('[API Refunds POST Error]', err);
    return NextResponse.json({ error: 'Failed to request refund' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('slcf_session')?.value || req.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 401 });
    }

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

    const approved = db.approveRefund(refundId, approvedBy || user.name || 'Super Admin', rzpRefund.id);

    db.logAction(
      'REFUND_APPROVED',
      'PAYMENT',
      target.paymentId,
      `Refund ${refundId} for ₹${target.amount} approved by ${user.name} (Razorpay ID: ${rzpRefund.id})`,
      { id: user.id, name: user.name, role: user.role }
    );

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
