import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const lead = db.getLeadById(id);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    const events = db.getLeadEvents(id);
    return NextResponse.json({ success: true, lead, events });
  } catch (error) {
    console.error('[API /leads/:id GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const body = await request.json();
    const { status, notes, assignedAgentId } = body;

    const lead = db.updateLeadStatus(id, status, user.name, notes);
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found.' }, { status: 404 });
    }

    if (assignedAgentId) {
      lead.assignedAgentId = assignedAgentId;
    }

    db.logAction('LEAD_UPDATED', 'LEAD', id, `Lead ${id} updated to status ${status}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('[API /leads/:id PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update lead.' }, { status: 500 });
  }
}
