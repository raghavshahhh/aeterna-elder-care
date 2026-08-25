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
    const { name, phone, email, upiId } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Name, phone, and email are required.' }, { status: 400 });
    }

    const newRef = db.createReferrer(name, phone, email, upiId);

    // Also create user account for partner portal login
    db.createUser({
      email,
      name,
      phone,
      passwordHash: db.getUsers().find(u => u.role === 'SUPER_ADMIN')?.passwordHash || '',
      role: 'REFERRAL_PARTNER',
      referralCode: newRef.code,
      isActive: true
    });

    db.logAction('REFERRER_REGISTERED', 'REFERRER', newRef.id, `Referral partner registered: ${name} (Code: ${newRef.code})`);

    return NextResponse.json({
      success: true,
      referrer: newRef,
      message: `Partner registered successfully! Your unique referral code is ${newRef.code}`
    });
  } catch (error) {
    console.error('[API /referrals POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to register referral partner.' }, { status: 500 });
  }
}
