import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (!user) {
    return NextResponse.json(
      { isAuthenticated: false },
      { status: 200 }
    );
  }

  return NextResponse.json({
    isAuthenticated: true,
    user
  });
}
