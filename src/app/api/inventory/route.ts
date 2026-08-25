import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId') || undefined;
    const status = searchParams.get('status') as any;
    const type = searchParams.get('type') || undefined;
    const block = searchParams.get('block') || undefined;

    const inventory = db.getInventory({ projectId, status, type, block });
    return NextResponse.json({ success: true, count: inventory.length, inventory });
  } catch (error) {
    console.error('[API /inventory GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch inventory.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, price, priceDisplay } = body;

    let updated;
    if (status) {
      updated = db.updateInventoryStatus(id, status);
    }
    if (price && priceDisplay) {
      updated = db.updateInventoryPrice(id, price, priceDisplay);
    }

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Unit not found.' }, { status: 404 });
    }

    db.logAction('INVENTORY_UPDATED', 'INVENTORY_UNIT', id, `Unit ${id} updated: status=${status || 'unchanged'}, price=${priceDisplay || 'unchanged'}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, unit: updated });
  } catch (error) {
    console.error('[API /inventory PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update unit.' }, { status: 500 });
  }
}
