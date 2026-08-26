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
    email = typeof email === 'string' ? email.trim() : '';
    upiId = typeof upiId === 'string' ? upiId.trim() : '';

    // Required Field Validation
    if (!name) {
      return NextResponse.json({ success: false, error: 'Partner full name is required.' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ success: false, error: 'Phone number is required.' }, { status: 400 });
    }
    if (name.length < 2) {
      return NextResponse.json({ success: false, error: 'Partner name must be at least 2 characters.' }, { status: 400 });
    }
    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 7) {
      return NextResponse.json({ success: false, error: 'Please enter a valid phone number.' }, { status: 400 });
    }
    const normPhone = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

    // Optional Email Validation (if supplied by user)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let finalEmail = '';

    if (email) {
      if (!emailRegex.test(email)) {
        return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
      }
      finalEmail = email.toLowerCase();
    } else {
      // Deterministic fallback login email generation for partner portal account
      const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'partner';
      finalEmail = `${cleanName}.${cleanDigits.slice(-4)}@partner.slcf.in`;
    }

    // Check if referrer already exists with the same phone or email
    const allReferrers = db.getReferrers();
    const existingRef = allReferrers.find((r) => {
      const rDigits = r.phone.replace(/\D/g, '');
      const rNorm = rDigits.length >= 10 ? rDigits.slice(-10) : rDigits;
      const phoneMatch = Boolean(rNorm && rNorm === normPhone);
      const emailMatch = Boolean(r.email && r.email.toLowerCase() === finalEmail.toLowerCase());
      return phoneMatch || emailMatch;
    });

    if (existingRef) {
      return NextResponse.json({
        success: true,
        isNew: false,
        referrer: existingRef,
        message: `Partner is already registered with referral code ${existingRef.code}.`
      });
    }

    // Create New Referrer Record
    const newRef = db.createReferrer(name, phone, finalEmail, upiId || undefined);

    // Create User Account for Partner Portal login if one doesn't exist
    const existingUser = db.getUsers().find((u) => u.email.toLowerCase() === finalEmail.toLowerCase());
    if (!existingUser) {
      db.createUser({
        email: finalEmail,
        name,
        phone,
        passwordHash: db.getUsers().find((u) => u.role === 'SUPER_ADMIN')?.passwordHash || '',
        role: 'REFERRAL_PARTNER',
        referralCode: newRef.code,
        isActive: true
      });
    }

    // Log administrative action
    db.logAction('REFERRER_REGISTERED', 'REFERRER', newRef.id, `Referral partner registered: ${name} (Code: ${newRef.code})`);

    return NextResponse.json({
      success: true,
      isNew: true,
      referrer: newRef,
      message: `Partner referral code ${newRef.code} generated successfully!`
    });
  } catch (error) {
    console.error('[API /referrals POST] Error:', error);
    return NextResponse.json({ success: false, error: 'An unexpected server error occurred while registering the partner.' }, { status: 500 });
  }
}
