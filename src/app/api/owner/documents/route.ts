import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { INITIAL_VAULT_DOCUMENTS } from '@/data/vaultDocuments';

// In-memory runtime store for new uploads during session
let runtimeDocuments = [...INITIAL_VAULT_DOCUMENTS];

export async function GET(request: NextRequest) {
  const token = request.cookies.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized. Please login to access the Owner Document Vault.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let filtered = [...runtimeDocuments];

  if (category && category !== 'all') {
    filtered = filtered.filter((d) => d.category === category);
  }

  if (search) {
    filtered = filtered.filter(
      (d) =>
        d.title.toLowerCase().includes(search) ||
        d.description.toLowerCase().includes(search) ||
        d.fileName.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    documents: filtered
  });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized. Owner authentication required for deletion.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Document ID is required.' },
      { status: 400 }
    );
  }

  runtimeDocuments = runtimeDocuments.filter((d) => d.id !== id);

  return NextResponse.json({
    success: true,
    message: 'Document successfully removed from Owner Vault.'
  });
}
