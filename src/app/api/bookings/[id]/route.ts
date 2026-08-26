import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
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
    const { id } = await params;
    const updates = await req.json();

    const updated = db.updateBooking(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: unknown) {
    console.error('[API Bookings PATCH [id] Error]', err);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
