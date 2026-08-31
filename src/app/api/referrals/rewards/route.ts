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

    const rewards = db.getReferralRewards();
    return NextResponse.json({ success: true, count: rewards.length, rewards });
  } catch (error) {
    console.error('[API /referrals/rewards GET] Error:', error);
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
    const { rewardId, isApproved, rejectionReason } = body;

    if (!rewardId || typeof isApproved !== 'boolean') {
      return NextResponse.json({ success: false, error: 'rewardId and isApproved are required.' }, { status: 400 });
    }

    const updated = db.verifyReferralReward(rewardId, isApproved, user.name, rejectionReason);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Reward record not found.' }, { status: 404 });
    }

    db.logAction(
      isApproved ? 'REWARD_VERIFIED' : 'REWARD_REJECTED',
      'REFERRAL_REWARD',
      rewardId,
      `₹50 reward ${isApproved ? 'VERIFIED' : 'REJECTED'} by ${user.name}${rejectionReason ? ` (${rejectionReason})` : ''}`,
      { id: user.id, name: user.name, role: user.role }
    );

    return NextResponse.json({ success: true, reward: updated });
  } catch (error) {
    console.error('[API /referrals/rewards PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update reward.' }, { status: 500 });
  }
}
