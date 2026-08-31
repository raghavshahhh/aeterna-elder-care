import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const commissions = db.getCommissions();
    return NextResponse.json({ success: true, count: commissions.length, commissions });
  } catch (error) {
    console.error('[API /commissions GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    const updated = db.updateCommissionStatus(id, status, user.name);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Commission not found.' }, { status: 404 });
    }

    db.logAction('COMMISSION_STATUS_UPDATED', 'COMMISSION', id, `Commission status changed to ${status}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, commission: updated });
  } catch (error) {
    console.error('[API /commissions PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update commission.' }, { status: 500 });
  }
}
