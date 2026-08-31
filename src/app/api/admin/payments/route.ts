import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/repository';
import { verifySessionToken, canAccessAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('slcf_session')?.value || req.cookies.get('sl_owner_session')?.value;
    const user = verifySessionToken(token);
    if (!user || !canAccessAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    // Release any expired holds
    db.releaseExpiredHolds();

    const allPayments = db.getPayments({
      status: status as any,
      search
    });

    const allBookings = db.getBookings();
    const allPlans = db.getPaymentPlans();
    const allLinks = db.getPaymentLinks();
    const allRefunds = db.getRefunds();

    // Financial KPIs
    const capturedPayments = allPayments.filter((p) => p.status === 'CAPTURED' || p.status === 'PAID');
    const totalCollected = capturedPayments.reduce((sum, p) => sum + p.amountPaid, 0);

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const thisMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const todayCollected = capturedPayments
      .filter((p) => p.createdAt.startsWith(todayStr))
      .reduce((sum, p) => sum + p.amountPaid, 0);

    const monthCollected = capturedPayments
      .filter((p) => p.createdAt.startsWith(thisMonthStr))
      .reduce((sum, p) => sum + p.amountPaid, 0);

    const totalOutstanding = allBookings
      .filter((b) => b.status === 'CONFIRMED' || b.status === 'HOLD')
      .reduce((sum, b) => sum + b.remainingBalance, 0);

    // Collect all installments with status
    const allInstallments = allPlans.flatMap((plan) => {
      const bk = allBookings.find((b) => b.id === plan.bookingId);
      return plan.installments.map((inst) => ({
        ...inst,
        bookingNumber: bk?.bookingNumber || plan.bookingId,
        customerName: bk?.customerName || 'Customer',
        customerPhone: bk?.customerPhone || '',
        unitCode: bk?.unitCode || plan.unitId,
        projectTitle: bk?.projectTitle || ''
      }));
    });

    const overdueInstallments = allInstallments.filter((i) => i.status === 'OVERDUE' || (i.status === 'DUE' && i.dueDate < todayStr));

    return NextResponse.json({
      metrics: {
        totalCollected,
        todayCollected,
        monthCollected,
        totalOutstanding,
        activeBookingsCount: allBookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'HOLD').length,
        completedSalesCount: allBookings.filter((b) => b.status === 'COMPLETED').length,
        overdueCount: overdueInstallments.length,
        totalRefundsAmount: allRefunds.filter((r) => r.status === 'COMPLETED').reduce((sum, r) => sum + r.amount, 0)
      },
      payments: allPayments,
      installments: allInstallments,
      paymentLinks: allLinks,
      refunds: allRefunds
    });
  } catch (err: unknown) {
    console.error('[API Admin Payments Error]', err);
    return NextResponse.json({ error: 'Failed to fetch admin financial data' }, { status: 500 });
  }
}
