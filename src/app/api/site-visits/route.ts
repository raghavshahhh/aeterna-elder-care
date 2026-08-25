import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as any;

    const visits = db.getSiteVisits(status);
    return NextResponse.json({ success: true, count: visits.length, siteVisits: visits });
  } catch (error) {
    console.error('[API /site-visits GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch site visits.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      projectId = 'PRJ-HARYANA-01',
      preferredDate,
      preferredTime = '11:00 AM',
      numberOfVisitors = 2,
      pickupRequired = false,
      pickupAddress,
      message,
      referralCode
    } = body;

    if (!name || !phone || !preferredDate) {
      return NextResponse.json({ success: false, error: 'Name, phone, and preferred date are required.' }, { status: 400 });
    }

    // Auto-create or associate lead
    let lead = db.checkDuplicateLead(phone);
    if (!lead) {
      lead = db.createLead({
        name,
        phone,
        email,
        projectId,
        source: 'SITE_VISIT_FORM',
        referralCode,
        status: 'SITE_VISIT',
        notes: `Booked site visit for ${preferredDate} at ${preferredTime}. Pickup: ${pickupRequired ? 'Yes' : 'No'}`
      });
    } else {
      db.updateLeadStatus(lead.id, 'SITE_VISIT', 'System', `Scheduled site visit on ${preferredDate}`);
    }

    const visit = db.createSiteVisit({
      leadId: lead.id,
      name,
      phone,
      email,
      projectId,
      preferredDate,
      preferredTime,
      numberOfVisitors: Number(numberOfVisitors) || 2,
      pickupRequired: Boolean(pickupRequired),
      pickupAddress,
      message,
      status: 'REQUESTED'
    });

    db.logAction('SITE_VISIT_REQUESTED', 'SITE_VISIT', visit.id, `Site visit requested by ${name} for ${preferredDate}`);

    return NextResponse.json({
      success: true,
      visitId: visit.id,
      message: 'Site visit successfully scheduled! Our executive will confirm pickup details.'
    });
  } catch (error) {
    console.error('[API /site-visits POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to schedule site visit.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, feedback } = body;

    const visit = db.updateSiteVisitStatus(id, status, feedback);
    if (!visit) {
      return NextResponse.json({ success: false, error: 'Site visit not found.' }, { status: 404 });
    }

    db.logAction('SITE_VISIT_STATUS_UPDATED', 'SITE_VISIT', id, `Site visit status changed to ${status}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, visit });
  } catch (error) {
    console.error('[API /site-visits PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update site visit.' }, { status: 500 });
  }
}
