import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/repository";
import { verifySessionToken, canAccessAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("slcf_session")?.value || request.cookies.get("sl_owner_session")?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const action = searchParams.get("action");

    let logs = db.getAuditLogs(limit);

    if (action) {
      logs = logs.filter((l) => l.action.toLowerCase() === action.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      logs,
      total: logs.length
    });
  } catch (error) {
    console.error("[API /audit-logs GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve audit logs." },
      { status: 500 }
    );
  }
}
