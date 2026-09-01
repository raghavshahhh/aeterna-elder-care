import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || searchParams.get('phone') || searchParams.get('booking');

    if (!query) {
      return NextResponse.json(
        { error: 'Please provide your registered mobile number or booking ID to access your portal.' },
        { status: 400 }
      );
    }

    const data = db.getBuyerDashboardData(query);
    if (!data) {
      return NextResponse.json(
        { error: 'No matching buyer records found for provided phone/booking number.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    console.error('[API Buyer Dashboard Error]', err);
    return NextResponse.json({ error: 'Failed to fetch buyer dashboard' }, { status: 500 });
  }
}
