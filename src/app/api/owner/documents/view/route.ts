import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { verifySessionToken } from '@/lib/auth';
import { getVaultDocumentById } from '@/lib/vaultStore';

// Only these project-root-relative directories may ever be read from disk.
const ALLOWED_ROOTS = ['private-assets', 'public/project-assets'];

function resolveSafeFilePath(filePath: string): string | null {
  const resolved = path.resolve(process.cwd(), filePath);
  const isAllowed = ALLOWED_ROOTS.some((root) =>
    resolved.startsWith(path.resolve(process.cwd(), root) + path.sep)
  );
  return isAllowed ? resolved : null;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized. Authentication required to view or download protected project documents.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const isDownload = searchParams.get('download') === 'true';

  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: 'Document ID is required.' },
      { status: 400 }
    );
  }

  const doc = getVaultDocumentById(id);
  if (!doc) {
    return NextResponse.json(
      { error: 'Document not found in Owner Vault repository.' },
      { status: 404 }
    );
  }

  const disposition = isDownload ? 'attachment' : 'inline';

  // Serve the real source file when one has been archived on disk
  if (doc.filePath) {
    const safePath = resolveSafeFilePath(doc.filePath);
    if (!safePath) {
      return NextResponse.json({ error: 'Invalid document path.' }, { status: 400 });
    }

    try {
      const fileBuffer = await readFile(safePath);
      return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `${disposition}; filename="${encodeURIComponent(doc.fileName)}"`,
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
    } catch {
      return NextResponse.json({ error: 'Source file could not be read from the vault.' }, { status: 500 });
    }
  }

  // Return a secure stream with anti-sniff headers
  const documentSummaryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${doc.title} - Owner Vault Record</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #071519; color: #FAF8F5; margin: 0; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; }
    .card { max-width: 720px; width: 100%; background: #0D2329; border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(44,94,80,0.3); border: 1px solid rgba(52,211,153,0.3); color: #34D399; font-size: 11px; font-weight: 700; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px; font-family: monospace; }
    h1 { font-family: Georgia, serif; font-size: 24px; margin: 16px 0 8px 0; color: #FAF8F5; }
    .desc { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 24px; }
    .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 18px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; font-size: 12px; color: rgba(255,255,255,0.7); font-family: monospace; }
    .meta strong { color: #FAF8F5; }
    .watermark { margin-top: 24px; text-align: center; font-size: 11px; color: #C58F58; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">${doc.categoryLabel} • ${doc.version}</span>
    <h1>${doc.title}</h1>
    <p class="desc">${doc.description}</p>
    <div class="meta">
      <div><strong>File Name:</strong> ${doc.fileName}</div>
      <div><strong>File Size:</strong> ${doc.fileSize}</div>
      <div><strong>Uploaded On:</strong> ${doc.uploadedAt}</div>
      <div><strong>Archived By:</strong> ${doc.uploadedBy}</div>
      <div><strong>Security:</strong> ${doc.visibility.toUpperCase()}</div>
      <div><strong>Pages:</strong> ${doc.pageCount || 1} Pages Verified</div>
    </div>
    <div class="watermark">
      🔒 CONFIDENTIAL • AUTHENTICATED ACCESS GRANTED TO: ${user.email} (${user.ownerId})
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(documentSummaryHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `${disposition}; filename="${encodeURIComponent(doc.fileName)}.html"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      'Pragma': 'no-cache'
    }
  });
}
