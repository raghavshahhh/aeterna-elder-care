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
    const locationId = searchParams.get('locationId') || undefined;
    const projectId = searchParams.get('projectId') || undefined;
    const search = searchParams.get('search') || undefined;

    const leads = db.getLeads({ status, locationId, projectId, search });
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error) {
    console.error('[API /leads GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve leads.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      locationId,
      projectId,
      interestedUnitType,
      budgetRange,
      source = 'WEBSITE_FORM',
      referralCode,
      landingPage,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      notes
    } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please provide a valid full name.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.replace(/[^0-9]/g, '').length < 10) {
      return NextResponse.json({ success: false, error: 'Please provide a valid 10-digit phone number.' }, { status: 400 });
    }

    // Check duplicate lead protection
    const existing = db.checkDuplicateLead(phone);
    if (existing) {
      // If submitted within duplicate window, log an event on existing lead without creating duplicate reward
      db.logAction('DUPLICATE_LEAD_SUBMISSION', 'LEAD', existing.id, `Repeat inquiry received from ${name} (${phone})`);
      return NextResponse.json({
        success: true,
        isDuplicate: true,
        leadId: existing.id,
        message: 'Thank you! We have received your inquiry and our senior care advisor will connect with you shortly.'
      });
    }

    // Server-side authoritative referral code resolution
    const serverCookieRef = request.cookies.get('slcf_ref')?.value;
    const effectiveReferralCode = (referralCode ? referralCode.trim().toUpperCase() : serverCookieRef ? serverCookieRef.trim().toUpperCase() : undefined);

    const lead = db.createLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : undefined,
      locationId: locationId || 'LOC-HARYANA',
      projectId: projectId || 'PRJ-HARYANA-01',
      interestedUnitType,
      budgetRange,
      source,
      referralCode: effectiveReferralCode,

      landingPage,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      status: 'NEW',
      notes
    });

    db.logAction('LEAD_INGESTED', 'LEAD', lead.id, `New lead created from ${source} (${name}, ${phone})`);

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Inquiry successfully registered.'
    });
  } catch (error) {
    console.error('[API /leads POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit inquiry.' }, { status: 500 });
  }
}
