import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/repository";

export async function GET(request: NextRequest) {
  try {
    const settings = db.getSettings();
    return NextResponse.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error("[API /settings GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve system settings." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      leadRewardAmount,
      defaultCommissionPercentage,
      defaultFixedCommissionAmount,
      referralAttributionCookieDays,
      autoVerifyLeads,
      duplicatePhoneWindowDays,
      holdExpiryHours,
      notificationEmail,
      whatsappContactNumber
    } = body;

    const updates: any = {};

    if (typeof leadRewardAmount === "number" && leadRewardAmount >= 0) {
      updates.leadRewardAmount = leadRewardAmount;
    }
    if (typeof defaultCommissionPercentage === "number" && defaultCommissionPercentage >= 0) {
      updates.defaultCommissionPercentage = defaultCommissionPercentage;
    }
    if (typeof defaultFixedCommissionAmount === "number" && defaultFixedCommissionAmount >= 0) {
      updates.defaultFixedCommissionAmount = defaultFixedCommissionAmount;
    }
    if (typeof referralAttributionCookieDays === "number" && referralAttributionCookieDays > 0) {
      updates.referralAttributionCookieDays = referralAttributionCookieDays;
    }
    if (typeof autoVerifyLeads === "boolean") {
      updates.autoVerifyLeads = autoVerifyLeads;
    }
    if (typeof duplicatePhoneWindowDays === "number" && duplicatePhoneWindowDays > 0) {
      updates.duplicatePhoneWindowDays = duplicatePhoneWindowDays;
    }
    if (typeof holdExpiryHours === "number" && holdExpiryHours > 0) {
      updates.holdExpiryHours = holdExpiryHours;
    }
    if (typeof notificationEmail === "string" && notificationEmail.includes("@")) {
      updates.notificationEmail = notificationEmail.trim();
    }
    if (typeof whatsappContactNumber === "string" && whatsappContactNumber.trim().length >= 8) {
      updates.whatsappContactNumber = whatsappContactNumber.trim();
    }

    const updated = db.updateSettings(updates);

    db.logAction(
      "SETTINGS_UPDATED",
      "SYSTEM_SETTINGS",
      "ROOT",
      `System configuration updated: Reward ₹${updated.leadRewardAmount}, Commission ${updated.defaultCommissionPercentage}%, Cookie ${updated.referralAttributionCookieDays}d`
    );

    return NextResponse.json({
      success: true,
      settings: updated,
      message: "System configuration updated successfully!"
    });
  } catch (error) {
    console.error("[API /settings PATCH] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update system settings." },
      { status: 500 }
    );
  }
}
