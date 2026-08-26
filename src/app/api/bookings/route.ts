import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { BookingStatus } from '@/lib/db/schema';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as BookingStatus | undefined;
    const projectId = searchParams.get('projectId') || undefined;
    const search = searchParams.get('search') || undefined;

    // Release any expired holds first
    db.releaseExpiredHolds();

    const bookings = db.getBookings({ status, projectId, search });
    return NextResponse.json({ bookings, count: bookings.length });
  } catch (err: unknown) {
    console.error('[API Bookings GET Error]', err);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      unitId,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      bookingAmount,
      totalAgreedPrice,
      paymentPlanType,
      referrerCode,
      holdHours,
      notes
    } = body;

    if (!unitId || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required booking fields (unitId, customerName, customerPhone)' },
        { status: 400 }
      );
    }

    const result = db.createBookingWithHold({
      unitId,
      customerName,
      customerPhone,
      customerEmail: customerEmail || `${customerName.toLowerCase().replace(/\s+/g, '')}@seniorliving.org`,
      customerAddress,
      bookingAmount,
      totalAgreedPrice,
      paymentPlanType,
      referrerCode,
      holdHours: holdHours || 24,
      notes
    });

    return NextResponse.json({
      success: true,
      message: `Unit ${result.unit.unitCode} held. Booking ${result.booking.bookingNumber} created.`,
      booking: result.booking,
      paymentPlan: result.paymentPlan,
      unit: result.unit
    });
  } catch (err: unknown) {
    console.error('[API Bookings POST Error]', err);
    const msg = err instanceof Error ? err.message : 'Booking creation failed';
    const isConflict = msg.toLowerCase().includes('not available') || msg.toLowerCase().includes('already');
    return NextResponse.json(
      { success: false, error: msg },
      { status: isConflict ? 409 : 400 }
    );
  }
}
