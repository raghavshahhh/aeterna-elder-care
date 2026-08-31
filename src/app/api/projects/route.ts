import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId') || undefined;
    const publishedOnly = searchParams.get('published') === 'true';

    const projects = db.getProjects(locationId, publishedOnly);
    return NextResponse.json({ success: true, count: projects.length, projects });
  } catch (error) {
    console.error('[API /projects GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch projects.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const project = db.createProject(body);

    db.logAction('PROJECT_CREATED', 'PROJECT', project.id, `Project created: ${project.name}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('[API /projects POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('slcf_session')?.value || request.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);

    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    const project = db.updateProject(id, updates);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
    }

    db.logAction('PROJECT_UPDATED', 'PROJECT', id, `Project updated: ${project.name}`, {
      id: user.id,
      name: user.name,
      role: user.role
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('[API /projects PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update project.' }, { status: 500 });
  }
}
