import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const receipt = db.getReceiptById(id);

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    const booking = db.getBookingById(receipt.bookingId);
    const payment = db.getPaymentById(receipt.paymentId);

    return NextResponse.json({
      receipt,
      booking,
      payment
    });
  } catch (err: unknown) {
    console.error('[API Receipts GET [id] Error]', err);
    return NextResponse.json({ error: 'Failed to fetch receipt' }, { status: 500 });
  }
}
