import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { listVaultDocuments, deleteVaultDocument } from '@/lib/vaultStore';

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
  const search = searchParams.get('search');

  // Input length guards
  const cleanSearch = search && search.length < 200 ? search : null;
  const cleanCategory = category && category.length < 50 ? category : null;

  const documents = listVaultDocuments(cleanCategory, cleanSearch);

  return NextResponse.json({
    success: true,
    total: documents.length,
    documents
  });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (!user || user.role !== 'owner') {
    return NextResponse.json(
      { error: 'Unauthorized. Owner authorization required for deletion.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || typeof id !== 'string' || id.length > 100) {
    return NextResponse.json(
      { error: 'Valid Document ID is required.' },
      { status: 400 }
    );
  }

  const deleted = deleteVaultDocument(id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Document not found or already removed.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Document successfully removed from Owner Vault.'
  });
}
