import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { addVaultDocument } from '@/lib/vaultStore';
import { VaultDocument, VaultDocumentCategory } from '@/types';

const ALLOWED_CATEGORIES: VaultDocumentCategory[] = [
  'land_title',
  'architecture',
  'approvals',
  'site_location',
  'site_evidence',
  'other'
];

const CATEGORY_LABELS: Record<VaultDocumentCategory, string> = {
  land_title: 'Land & Title',
  architecture: 'Architecture',
  approvals: 'Approvals & Trust',
  site_location: 'Site & Location',
  site_evidence: 'Site Evidence',
  other: 'Other Documents'
};

export async function POST(request: NextRequest) {
  const token = request.cookies.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (!user || user.role !== 'owner') {
    return NextResponse.json(
      { error: 'Unauthorized. Owner authentication required for uploading.' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const title = (formData.get('title') as string)?.trim();
    const category = (formData.get('category') as string)?.trim() as VaultDocumentCategory;
    const description = (formData.get('description') as string)?.trim();
    const version = (formData.get('version') as string)?.trim() || 'v1.0';
    const visibility = ((formData.get('visibility') as string)?.trim() as 'owner_only' | 'authorized' | 'public') || 'owner_only';
    const file = formData.get('file') as File | null;

    if (!title || title.length > 150) {
      return NextResponse.json(
        { error: 'Title is required and must be under 150 characters.' },
        { status: 400 }
      );
    }

    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: 'Valid Category is required.' },
        { status: 400 }
      );
    }

    if (!description || description.length > 1000) {
      return NextResponse.json(
        { error: 'Description is required and must be under 1000 characters.' },
        { status: 400 }
      );
    }

    if (file && file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds maximum allowed limit of 50 MB.' },
        { status: 400 }
      );
    }

    // Sanitize filename against directory traversal / injection
    const rawFileName = file ? file.name : `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
    const cleanFileName = rawFileName.replace(/[^a-zA-Z0-9._-]/g, '_');

    const docId = `doc-vault-${Date.now()}`;

    const newDoc: VaultDocument = {
      id: docId,
      title,
      category,
      categoryLabel: CATEGORY_LABELS[category] || 'Project Documentation',
      description,
      fileName: cleanFileName,
      fileUrl: `/api/owner/documents/view?id=${docId}`,
      fileType: 'pdf',
      fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '4.5 MB',
      version: version.substring(0, 10),
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: user.email || 'Owner Desk',
      visibility,
      pageCount: 8
    };

    addVaultDocument(newDoc);

    return NextResponse.json({
      success: true,
      message: 'Document successfully archived in Owner Vault.',
      document: newDoc
    });
  } catch {
    return NextResponse.json(
      { error: 'Document upload processing failed.' },
      { status: 500 }
    );
  }
}
