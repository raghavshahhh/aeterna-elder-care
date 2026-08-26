import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { createRazorpayOrder, getPublicRazorpayKey } from '@/lib/payments/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, installmentId, isFullPayment } = body;

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId parameter' }, { status: 400 });
    }

    const booking = db.getBookingById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const plan = db.getPaymentPlanByBookingId(booking.id);
    if (!plan) {
      return NextResponse.json({ error: 'Payment plan not found for booking' }, { status: 404 });
    }

    let targetAmount = 0;
    let targetInstallment = undefined;

    if (isFullPayment) {
      targetAmount = booking.remainingBalance > 0 ? booking.remainingBalance : booking.totalAgreedPrice;
    } else if (installmentId) {
      targetInstallment = plan.installments.find((i) => i.id === installmentId);
      if (!targetInstallment) {
        return NextResponse.json({ error: 'Installment not found' }, { status: 404 });
      }
      targetAmount = targetInstallment.amount - targetInstallment.paidAmount;
    } else {
      // Default to next due installment
      targetInstallment = plan.installments.find((i) => i.status === 'DUE' || i.status === 'PENDING' || i.status === 'OVERDUE') || plan.installments[0];
      targetAmount = targetInstallment.amount - targetInstallment.paidAmount;
    }

    if (targetAmount <= 0) {
      return NextResponse.json({ error: 'No outstanding balance due for this selection.' }, { status: 400 });
    }

    const receiptId = `RCP-${booking.bookingNumber}-${Date.now().toString().slice(-4)}`;
    const razorpayOrder = await createRazorpayOrder({
      amountInINR: targetAmount,
      receiptId,
      notes: {
        bookingId: booking.id,
        bookingNumber: booking.bookingNumber,
        unitCode: booking.unitCode,
        projectTitle: booking.projectTitle,
        installmentId: targetInstallment?.id || 'FULL_PAYMENT'
      }
    });

    return NextResponse.json({
      success: true,
      keyId: getPublicRazorpayKey(),
      orderId: razorpayOrder.id,
      amount: targetAmount,
      amountInPaise: razorpayOrder.amount,
      currency: 'INR',
      booking: {
        id: booking.id,
        bookingNumber: booking.bookingNumber,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        unitCode: booking.unitCode,
        projectTitle: booking.projectTitle,
        totalPrice: booking.totalAgreedPrice,
        remainingBalance: booking.remainingBalance
      },
      installment: targetInstallment
        ? {
            id: targetInstallment.id,
            title: targetInstallment.title,
            installmentNumber: targetInstallment.installmentNumber,
            amount: targetInstallment.amount
          }
        : null,
      isFullPayment: Boolean(isFullPayment)
    });
  } catch (err: unknown) {
    console.error('[API create-order Error]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Order creation failed' }, { status: 500 });
  }
}
