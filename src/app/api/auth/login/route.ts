import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, createSessionToken } from '@/lib/auth';
import { db } from '@/lib/db/repository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'Identifier and password are required.' },
        { status: 400 }
      );
    }

    const user = authenticateUser(identifier, password);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials or inactive account.' },
        { status: 401 }
      );
    }

    // Determine redirect destination based on role
    let redirectUrl = '/admin';
    if (user.role === 'OWNER') {
      redirectUrl = '/owner/documents';
    } else if (user.role === 'REFERRAL_PARTNER') {
      redirectUrl = '/portal/referral';
    }

    const token = createSessionToken(user);

    // Audit log login
    db.logAction('USER_LOGIN', 'USER', user.id, `User ${user.email} logged in with role ${user.role}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    const response = NextResponse.json({
      success: true,
      user,
      redirectUrl
    });

    response.cookies.set('slcf_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('[API /auth/login] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server authentication error.' },
      { status: 500 }
    );
  }
}
