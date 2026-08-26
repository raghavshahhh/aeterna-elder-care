import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || searchParams.get('phone') || searchParams.get('booking');

    if (!query) {
      // Default to Col. Rajesh Bakshi for demo if no param provided
      const demoData = db.getBuyerDashboardData('+91 98112 34567');
      return NextResponse.json({ data: demoData });
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
