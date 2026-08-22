import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { VaultDocument, VaultDocumentCategory } from '@/types';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized. Owner authentication required for uploading.' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as VaultDocumentCategory;
    const description = formData.get('description') as string;
    const version = (formData.get('version') as string) || 'v1.0';
    const visibility = (formData.get('visibility') as 'owner_only' | 'authorized' | 'public') || 'owner_only';
    const file = formData.get('file') as File | null;

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: 'Title, Category, and Description are required fields.' },
        { status: 400 }
      );
    }

    const categoryLabels: Record<VaultDocumentCategory, string> = {
      land_title: 'Land & Title',
      architecture: 'Architecture',
      approvals: 'Approvals & Trust',
      site_location: 'Site & Location',
      site_evidence: 'Site Evidence',
      other: 'Other Documents'
    };

    const newDoc: VaultDocument = {
      id: `doc-custom-${Date.now()}`,
      title,
      category,
      categoryLabel: categoryLabels[category] || 'Project Documentation',
      description,
      fileName: file ? file.name : `${title.replace(/\s+/g, '_')}.pdf`,
      fileUrl: '/documents/mock-uploaded-doc.pdf',
      fileType: 'pdf',
      fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '3.2 MB',
      version,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: user.email || 'Owner Desk',
      visibility,
      pageCount: 6
    };

    return NextResponse.json({
      success: true,
      message: 'Document successfully archived in Owner Vault.',
      document: newDoc
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Document upload processing failed.' },
      { status: 500 }
    );
  }
}
