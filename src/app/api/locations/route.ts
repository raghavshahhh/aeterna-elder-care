import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    const locations = db.getLocations(publishedOnly);
    return NextResponse.json({ success: true, count: locations.length, locations });
  } catch (error) {
    console.error('[API /locations GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch locations.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const location = db.createLocation(body);

    db.logAction('LOCATION_CREATED', 'LOCATION', location.id, `Location created: ${location.name}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, location });
  } catch (error) {
    console.error('[API /locations POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create location.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    const location = db.updateLocation(id, updates);
    if (!location) {
      return NextResponse.json({ success: false, error: 'Location not found.' }, { status: 404 });
    }

    db.logAction('LOCATION_UPDATED', 'LOCATION', id, `Location updated: ${location.name}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, location });
  } catch (error) {
    console.error('[API /locations PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update location.' }, { status: 500 });
  }
}
