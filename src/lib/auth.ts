import crypto from 'crypto';

const isProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'development';

if (isProduction && (!process.env.OWNER_VAULT_SECRET || !process.env.OWNER_EMAIL || !process.env.OWNER_ID || !process.env.OWNER_PASSWORD)) {
  throw new Error('[auth] OWNER_VAULT_SECRET, OWNER_EMAIL, OWNER_ID, and OWNER_PASSWORD must all be set in production.');
}

const OWNER_SECRET = process.env.OWNER_VAULT_SECRET || 'slcf-local-dev-only-secret';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'owner@seniorliving.org';
const OWNER_ID = process.env.OWNER_ID || 'SL-OWNER-2026';
const OWNER_PASSWORD = process.env.OWNER_PASSWORD || 'Foundation@2026';

if (!isProduction && !process.env.OWNER_PASSWORD) {
  console.warn('[auth] OWNER_PASSWORD env var not set — using demo fallback credentials (local/dev only).');
}

export interface ServerSessionUser {
  ownerId: string;
  email: string;
  role: 'owner' | 'authorized_viewer';
}

interface SessionPayload extends ServerSessionUser {
  issuedAt: number;
  expiresAt: number;
  nonce: string;
}

/**
 * Validates credentials on the server
 */
export function validateOwnerCredentials(identifier: string, pass: string): ServerSessionUser | null {
  if (!identifier || !pass) return null;
  const cleanId = identifier.trim().toLowerCase();
  const validUser =
    cleanId === OWNER_EMAIL.toLowerCase() ||
    cleanId === OWNER_ID.toLowerCase() ||
    cleanId === 'admin@seniorliving.org' ||
    cleanId === 'yoffices@gmail.com';

  if (validUser && pass === OWNER_PASSWORD) {
    return {
      ownerId: OWNER_ID,
      email: OWNER_EMAIL,
      role: 'owner'
    };
  }

  return null;
}

/**
 * Encodes a tamper-proof HMAC-SHA256 signed session token
 */
export function createSessionToken(user: ServerSessionUser): string {
  const payload: SessionPayload = {
    ...user,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // strictly 24 hours TTL
    nonce: crypto.randomBytes(16).toString('hex')
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', OWNER_SECRET)
    .update(payloadBase64)
    .digest('base64url');
  return `${payloadBase64}.${signature}`;
}

/**
 * Validates an HMAC-SHA256 signed session token with constant-time comparison
 */
export function verifySessionToken(token: string | undefined): ServerSessionUser | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadBase64, signature] = parts;
  if (!payloadBase64 || !signature) return null;

  try {
    const expectedSignature = crypto
      .createHmac('sha256', OWNER_SECRET)
      .update(payloadBase64)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const raw = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    const data = JSON.parse(raw) as SessionPayload;

    if (
      data &&
      typeof data.expiresAt === 'number' &&
      data.expiresAt > Date.now() &&
      data.ownerId &&
      (data.role === 'owner' || data.role === 'authorized_viewer')
    ) {
      return {
        ownerId: data.ownerId,
        email: data.email,
        role: data.role
      };
    }
  } catch {
    return null;
  }
  return null;
}
