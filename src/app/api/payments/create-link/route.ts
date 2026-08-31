import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { createRazorpayPaymentLink } from '@/lib/payments/razorpay';
import { PaymentLinkRecord } from '@/lib/db/schema';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('slcf_session')?.value || req.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 401 });
    }

    const body = await req.json();
    const { bookingId, installmentId, customAmount, description } = body;

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId parameter' }, { status: 400 });
    }

    const booking = db.getBookingById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const plan = db.getPaymentPlanByBookingId(booking.id);
    let amount = customAmount;

    if (!amount) {
      if (installmentId && plan) {
        const inst = plan.installments.find((i) => i.id === installmentId);
        if (inst) amount = inst.amount - inst.paidAmount;
      }
      if (!amount) {
        amount = booking.remainingBalance > 0 ? booking.remainingBalance : booking.bookingAmount;
      }
    }

    const desc = description || `Payment for ${booking.unitCode} - ${booking.projectTitle}`;

    const linkResult = await createRazorpayPaymentLink({
      amountInINR: amount,
      description: desc,
      customer: {
        name: booking.customerName,
        email: booking.customerEmail,
        contact: booking.customerPhone
      },
      notes: {
        bookingId: booking.id,
        installmentId: installmentId || '',
        unitCode: booking.unitCode,
        projectTitle: booking.projectTitle
      },
      expireByHours: 72
    });

    const linkRecord: PaymentLinkRecord = {
      id: `PLINK-${Date.now().toString().slice(-4)}`,
      bookingId: booking.id,
      installmentId,
      razorpayLinkId: linkResult.id,
      shortUrl: linkResult.short_url,
      amount,
      amountPaid: 0,
      amountDue: amount,
      description: desc,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      customerEmail: booking.customerEmail,
      status: 'CREATED',
      expiresAt: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.savePaymentLink(linkRecord);

    db.logAction(
      'PAYMENT_LINK_GENERATED',
      'PAYMENT',
      booking.id,
      `Razorpay payment link generated for ₹${amount} (${booking.bookingNumber} - ${booking.customerName}) by ${user.name} (Link: ${linkRecord.shortUrl})`,
      { id: user.id, name: user.name, role: user.role }
    );

    return NextResponse.json({
      success: true,
      link: linkRecord
    });
  } catch (err: unknown) {
    console.error('[API create-link Error]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Payment link generation failed' }, { status: 500 });
  }
}
