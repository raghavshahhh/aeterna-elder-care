import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value;
    const user = verifySessionToken(token);

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    // If querying specific public code validation
    if (code) {
      const ref = db.getReferrerByCode(code);
      if (!ref || !ref.isActive) {
        return NextResponse.json({ success: false, error: 'Invalid or inactive referral code.' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        referrer: {
          code: ref.code,
          name: ref.name
        }
      });
    }

    // If referral partner querying own stats
    if (user && user.role === 'REFERRAL_PARTNER') {
      const partner = user.referralCode ? db.getReferrerByCode(user.referralCode) : undefined;
      const rewards = partner ? db.getReferralRewards(partner.id) : [];
      const commissions = partner ? db.getCommissions(partner.id) : [];
      return NextResponse.json({
        success: true,
        partner,
        rewards,
        commissions
      });
    }

    // Admin listing
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const referrers = db.getReferrers();
    return NextResponse.json({ success: true, count: referrers.length, referrers });
  } catch (error) {
    console.error('[API /referrals GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve referral data.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { name, phone, email, upiId } = body;

    name = typeof name === 'string' ? name.trim() : '';
    phone = typeof phone === 'string' ? phone.trim() : '';
    upiId = typeof upiId === 'string' ? upiId.trim() : '';
    email = typeof email === 'string' ? email.trim() : '';

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Partner name and phone number are required.' }, { status: 400 });
    }

    // If email is not explicitly provided, derive from UPI if UPI looks like an email, or generate clean partner email
    if (!email) {
      if (upiId && upiId.includes('@') && (upiId.includes('.com') || upiId.includes('.in') || upiId.includes('.org') || upiId.includes('.net'))) {
        email = upiId;
      } else {
        const cleanPhone = phone.replace(/\D/g, '') || 'partner';
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'partner';
        email = `${cleanName}.${cleanPhone.slice(-4)}@partner.slcf.in`;
      }
    }

    // Check if referrer already exists with same phone or email
    const existingRef = db.getReferrers().find(
      (r) => r.phone === phone || (r.email && r.email.toLowerCase() === email.toLowerCase())
    );

    if (existingRef) {
      return NextResponse.json({
        success: true,
        referrer: existingRef,
        message: `Partner is already registered! Unique referral code: ${existingRef.code}`
      });
    }

    const newRef = db.createReferrer(name, phone, email, upiId || undefined);

    // Also create user account for partner portal login if user doesn't already exist
    const existingUser = db.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!existingUser) {
      db.createUser({
        email,
        name,
        phone,
        passwordHash: db.getUsers().find((u) => u.role === 'SUPER_ADMIN')?.passwordHash || '',
        role: 'REFERRAL_PARTNER',
        referralCode: newRef.code,
        isActive: true
      });
    }

    db.logAction('REFERRER_REGISTERED', 'REFERRER', newRef.id, `Referral partner registered: ${name} (Code: ${newRef.code})`);

    return NextResponse.json({
      success: true,
      referrer: newRef,
      message: `Partner registered successfully! Unique referral code: ${newRef.code}`
    });
  } catch (error) {
    console.error('[API /referrals POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to register referral partner.' }, { status: 500 });
  }
}
