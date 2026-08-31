import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get('slcf_session')?.value || req.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 401 });
    }

    const { id } = await params;
    const booking = db.getBookingById(id);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const project = db.getProjectById(booking.projectId);
    const unit = db.getInventoryUnitById(booking.unitId);
    const paymentPlan = db.getPaymentPlanByBookingId(booking.id);
    const payments = db.getPaymentsByBookingId(booking.id);
    const receipts = db.getReceipts(booking.id);

    return NextResponse.json({
      booking,
      project,
      unit,
      paymentPlan,
      payments,
      receipts
    });
  } catch (err: unknown) {
    console.error('[API Bookings GET [id] Error]', err);
    return NextResponse.json({ error: 'Failed to fetch booking details' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get('slcf_session')?.value || req.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 401 });
    }

    const { id } = await params;
    const updates = await req.json();

    const existing = db.getBookingById(id);
    const updated = db.updateBooking(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    db.logAction(
      'BOOKING_UPDATED',
      'BOOKING',
      id,
      `Booking ${updated.bookingNumber} (${updated.unitCode}) updated by ${user.name}: status=${updated.status} (previously ${existing?.status || 'N/A'})`,
      { id: user.id, name: user.name, role: user.role }
    );

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: unknown) {
    console.error('[API Bookings PATCH [id] Error]', err);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
