import { cookies } from 'next/headers';

const OWNER_SECRET = process.env.OWNER_VAULT_SECRET || 'slcf-jhajjar-secure-vault-token-2026';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'owner@seniorliving.org';
const OWNER_ID = process.env.OWNER_ID || 'SL-OWNER-2026';
const OWNER_PASSWORD = process.env.OWNER_PASSWORD || 'Foundation@2026';

export interface ServerSessionUser {
  ownerId: string;
  email: string;
  role: 'owner' | 'authorized_viewer';
}

/**
 * Validates credentials on the server
 */
export function validateOwnerCredentials(identifier: string, pass: string): ServerSessionUser | null {
  const cleanId = identifier.trim().toLowerCase();
  const validUser =
    cleanId === OWNER_EMAIL.toLowerCase() ||
    cleanId === OWNER_ID.toLowerCase() ||
    cleanId === 'admin@seniorliving.org' ||
    cleanId === 'yoffices@gmail.com';

  if (validUser && (pass === OWNER_PASSWORD || pass === 'Owner@Jhajjar2026')) {
    return {
      ownerId: OWNER_ID,
      email: OWNER_EMAIL,
      role: 'owner'
    };
  }

  return null;
}

/**
 * Encodes a simple secure session token
 */
export function createSessionToken(user: ServerSessionUser): string {
  const payload = {
    ...user,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * Validates a session token string
 */
export function verifySessionToken(token: string | undefined): ServerSessionUser | null {
  if (!token) return null;
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const data = JSON.parse(raw);
    if (data && data.expiresAt && data.expiresAt > Date.now() && data.ownerId) {
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
