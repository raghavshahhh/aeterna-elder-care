import { NextRequest, NextResponse } from 'next/server';
import { validateOwnerCredentials, createSessionToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Owner ID/Email and Password are required.' },
        { status: 400 }
      );
    }

    const user = validateOwnerCredentials(identifier, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid Owner ID or Password. Access denied.' },
        { status: 401 }
      );
    }

    const token = createSessionToken(user);

    const response = NextResponse.json({
      success: true,
      message: 'Owner authentication successful.',
      user: {
        ownerId: user.ownerId,
        email: user.email,
        role: user.role
      }
    });

    // Set secure HTTP-only cookie
    response.cookies.set('sl_owner_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Server authentication failed.' },
      { status: 500 }
    );
  }
}
