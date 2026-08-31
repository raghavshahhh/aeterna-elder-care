import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = body.code || request.nextUrl.searchParams.get("code") || request.nextUrl.searchParams.get("ref");

    if (!code) {
      return NextResponse.json({ success: false, error: "Referral code required" }, { status: 400 });
    }

    const updated = db.recordReferralClick(code);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Referral code not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      code: updated.code,
      totalVisits: updated.totalVisits
    });
  } catch (error) {
    console.error("[API /referrals/click POST] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code") || request.nextUrl.searchParams.get("ref");
    if (!code) {
      return NextResponse.json({ success: false, error: "Referral code required" }, { status: 400 });
    }

    const updated = db.recordReferralClick(code);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Referral code not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      code: updated.code,
      totalVisits: updated.totalVisits
    });
  } catch (error) {
    console.error("[API /referrals/click GET] Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
