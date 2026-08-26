import fs from 'fs';
import path from 'path';
import {
  User,
  Franchise,
  Location,
  Project,
  InventoryUnit,
  Lead,
  LeadEvent,
  SiteVisit,
  Booking,
  PaymentPlan,
  PaymentInstallment,
  PaymentRecord,
  PaymentLinkRecord,
  PaymentReceipt,
  RefundRecord,
  PaymentEvent,
  BuyerDocument,
  Referrer,
  ReferralReward,
  Commission,
  DocumentRecord,
  DocumentVersion,
  AuditLog,
  SystemSettings,
  LeadStatus,
  InventoryStatus,
  SiteVisitStatus,
  PaymentStatus,
  BookingStatus,
  RewardStatus,
  CommissionStatus
} from './schema';
import {
  SEED_USERS,
  SEED_FRANCHISES,
  SEED_LOCATIONS,
  SEED_PROJECTS,
  generateSeedInventory,
  SEED_REFERRERS,
  SEED_DOCUMENTS,
  SEED_SETTINGS,
  SEED_BOOKINGS,
  SEED_PAYMENT_PLANS,
  SEED_PAYMENTS,
  SEED_RECEIPTS,
  SEED_BUYER_DOCUMENTS
} from './seed';

interface DatabaseState {
  users: User[];
  franchises: Franchise[];
  locations: Location[];
  projects: Project[];
  inventory: InventoryUnit[];
  leads: Lead[];
  leadEvents: LeadEvent[];
  siteVisits: SiteVisit[];
  bookings: Booking[];
  paymentPlans: PaymentPlan[];
  payments: PaymentRecord[];
  paymentLinks: PaymentLinkRecord[];
  receipts: PaymentReceipt[];
  refunds: RefundRecord[];
  paymentEvents: PaymentEvent[];
  buyerDocuments: BuyerDocument[];
  referrers: Referrer[];
  referralRewards: ReferralReward[];
  commissions: Commission[];
  documents: DocumentRecord[];
  auditLogs: AuditLog[];
  settings: SystemSettings;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'slcf_database.json');

// In-memory cache singleton
let memoryDb: DatabaseState | null = null;

function ensureDataFile(): DatabaseState {
  if (memoryDb) return memoryDb;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as DatabaseState;
      // Ensure all arrays are initialized if DB was created in older schema
      parsed.bookings = parsed.bookings || [...SEED_BOOKINGS];
      parsed.paymentPlans = parsed.paymentPlans || [...SEED_PAYMENT_PLANS];
      parsed.payments = parsed.payments || [...SEED_PAYMENTS];
      parsed.paymentLinks = parsed.paymentLinks || [];
      parsed.receipts = parsed.receipts || [...SEED_RECEIPTS];
      parsed.refunds = parsed.refunds || [];
      parsed.paymentEvents = parsed.paymentEvents || [];
      parsed.buyerDocuments = parsed.buyerDocuments || [...SEED_BUYER_DOCUMENTS];
      memoryDb = parsed;
      return memoryDb;
    }
  } catch (err) {
    console.warn('[DB] Failed to load DB file from disk, initializing from seeds:', err);
  }

  // Initialize from rich seed dataset
  memoryDb = {
    users: [...SEED_USERS],
    franchises: [...SEED_FRANCHISES],
    locations: [...SEED_LOCATIONS],
    projects: [...SEED_PROJECTS],
    inventory: generateSeedInventory(),
    leads: [
      {
        id: 'LEAD-1001',
        name: 'Col. Rajesh Bakshi (Retd.)',
        phone: '+91 98112 34567',
        email: 'rajesh.bakshi@gmail.com',
        locationId: 'LOC-HARYANA',
        projectId: 'PRJ-HARYANA-01',
        interestedUnitType: '1_BHK_RESIDENCE',
        budgetRange: '₹35L - ₹45L',
        source: 'REFERRAL_LINK',
        referralCode: 'SLF8K2',
        referrerId: 'REF-001',
        status: 'BOOKED',
        isVerified: true,
        rewardStatus: 'VERIFIED',
        notes: 'Down payment paid for Suite A-102. Installment 2 scheduled.',
        createdAt: '2026-02-15T10:30:00Z',
        updatedAt: '2026-02-15T12:00:00Z'
      },
      {
        id: 'LEAD-1002',
        name: 'Sunita & Vikram Kapoor',
        phone: '+91 99580 98765',
        email: 'vkapoor@outlook.com',
        locationId: 'LOC-HARYANA',
        projectId: 'PRJ-HARYANA-01',
        interestedUnitType: 'PLOT',
        budgetRange: '₹25L - ₹30L',
        source: 'WEBSITE_FORM',
        status: 'SITE_VISIT',
        isVerified: true,
        rewardStatus: 'PENDING',
        notes: '24-hour priority reservation hold placed on Plot A-04.',
        createdAt: '2026-02-22T16:45:00Z',
        updatedAt: '2026-02-24T09:00:00Z'
      }
    ],
    leadEvents: [
      {
        id: 'EVT-01',
        leadId: 'LEAD-1001',
        eventType: 'CREATED',
        description: 'Lead registered via referral link from Ramesh Sharma (SLF8K2)',
        createdAt: '2026-02-15T10:30:00Z'
      },
      {
        id: 'EVT-02',
        leadId: 'LEAD-1001',
        eventType: 'BOOKED',
        description: 'Unit Suite A-102 booked with ₹5,00,000 initial installment.',
        actorName: 'System',
        createdAt: '2026-02-15T12:00:00Z'
      }
    ],
    siteVisits: [
      {
        id: 'VISIT-501',
        leadId: 'LEAD-1002',
        name: 'Sunita & Vikram Kapoor',
        phone: '+91 99580 98765',
        email: 'vkapoor@outlook.com',
        projectId: 'PRJ-HARYANA-01',
        preferredDate: '2026-03-01',
        preferredTime: '11:00 AM',
        numberOfVisitors: 2,
        pickupRequired: true,
        pickupAddress: 'Sector 12, Dwarka, New Delhi',
        status: 'CONFIRMED',
        notes: 'Chauffeured pickup arranged at 9:30 AM.',
        createdAt: '2026-02-22T16:45:00Z',
        updatedAt: '2026-02-24T09:00:00Z'
      }
    ],
    bookings: [...SEED_BOOKINGS],
    paymentPlans: [...SEED_PAYMENT_PLANS],
    payments: [...SEED_PAYMENTS],
    paymentLinks: [],
    receipts: [...SEED_RECEIPTS],
    refunds: [],
    paymentEvents: [
      {
        id: 'PEVT-01',
        bookingId: 'BK-2026-001',
        paymentId: 'PAY-1001',
        installmentId: 'INST-001',
        eventType: 'PAYMENT_CAPTURED',
        description: 'First Installment payment of ₹5,00,000 captured via Razorpay NetBanking (HDFC).',
        actorName: 'Razorpay Webhook',
        createdAt: '2026-02-15T12:00:01Z'
      }
    ],
    buyerDocuments: [...SEED_BUYER_DOCUMENTS],
    referrers: [...SEED_REFERRERS],
    referralRewards: [
      {
        id: 'RWD-101',
        referrerId: 'REF-001',
        referrerCode: 'SLF8K2',
        leadId: 'LEAD-1001',
        leadName: 'Col. Rajesh Bakshi (Retd.)',
        leadPhone: '+91 98112 34567',
        rewardAmount: 50,
        status: 'VERIFIED',
        verifiedAt: '2026-02-15T11:00:00Z',
        verifiedBy: 'System Lead Auditor',
        createdAt: '2026-02-15T10:30:00Z'
      }
    ],
    commissions: [
      {
        id: 'COM-201',
        referrerId: 'REF-001',
        referrerCode: 'SLF8K2',
        bookingId: 'BK-2026-001',
        unitId: 'GOA-SUITE-102',
        projectId: 'PRJ-GOA-01',
        saleValue: 1000000,
        commissionType: 'PERCENTAGE',
        commissionRate: 1.0,
        commissionAmount: 10000,
        status: 'APPROVED',
        approvedAt: '2026-02-15T12:30:00Z',
        approvedBy: 'Finance Desk',
        createdAt: '2026-02-15T12:00:00Z'
      }
    ],
    documents: [...SEED_DOCUMENTS],
    auditLogs: [
      {
        id: 'LOG-001',
        userName: 'System Initializer',
        userRole: 'SUPER_ADMIN',
        action: 'DATABASE_INITIALIZATION',
        entityType: 'SYSTEM',
        entityId: 'ROOT',
        details: 'Initial database state seeded with Haryana & Goa sanctuaries, payment plans, and statutory documents.',
        createdAt: '2026-01-01T00:00:00Z'
      }
    ],
    settings: { ...SEED_SETTINGS }
  };

  saveData(memoryDb);
  return memoryDb;
}

function saveData(state: DatabaseState): void {
  memoryDb = state;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] Error writing DB file:', err);
  }
}

// ----------------------------------------------------------------------
// EXPORTED REPOSITORY METHODS
// ----------------------------------------------------------------------

export const db = {
  // USERS
  getUsers: (): User[] => {
    return ensureDataFile().users;
  },
  getUserById: (id: string): User | undefined => {
    return ensureDataFile().users.find((u) => u.id === id);
  },
  getUserByEmail: (email: string): User | undefined => {
    return ensureDataFile().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  createUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const state = ensureDataFile();
    const newUser: User = {
      ...user,
      id: `USR-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.users.push(newUser);
    saveData(state);
    return newUser;
  },
  updateUser: (id: string, updates: Partial<User>): User | undefined => {
    const state = ensureDataFile();
    const idx = state.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    state.users[idx] = { ...state.users[idx], ...updates, updatedAt: new Date().toISOString() };
    saveData(state);
    return state.users[idx];
  },

  // LOCATIONS
  getLocations: (publishedOnly = false): Location[] => {
    const locs = ensureDataFile().locations;
    return publishedOnly ? locs.filter((l) => l.isPublished).sort((a, b) => a.displayOrder - b.displayOrder) : locs;
  },
  getLocationBySlug: (slug: string): Location | undefined => {
    return ensureDataFile().locations.find((l) => l.slug === slug);
  },
  getLocationById: (id: string): Location | undefined => {
    return ensureDataFile().locations.find((l) => l.id === id);
  },
  createLocation: (data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>): Location => {
    const state = ensureDataFile();
    const newLoc: Location = {
      ...data,
      id: `LOC-${data.slug.toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.locations.push(newLoc);
    saveData(state);
    return newLoc;
  },
  updateLocation: (id: string, updates: Partial<Location>): Location | undefined => {
    const state = ensureDataFile();
    const idx = state.locations.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;
    state.locations[idx] = { ...state.locations[idx], ...updates, updatedAt: new Date().toISOString() };
    saveData(state);
    return state.locations[idx];
  },

  // PROJECTS
  getProjects: (locationId?: string, publishedOnly = false): Project[] => {
    let projs = ensureDataFile().projects;
    if (locationId) projs = projs.filter((p) => p.locationId === locationId);
    if (publishedOnly) projs = projs.filter((p) => p.isPublished);
    return projs;
  },
  getProjectBySlug: (slug: string): Project | undefined => {
    return ensureDataFile().projects.find((p) => p.slug === slug);
  },
  getProjectById: (id: string): Project | undefined => {
    return ensureDataFile().projects.find((p) => p.id === id);
  },
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const state = ensureDataFile();
    const newProj: Project = {
      ...data,
      id: `PRJ-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.projects.push(newProj);
    saveData(state);
    return newProj;
  },
  updateProject: (id: string, updates: Partial<Project>): Project | undefined => {
    const state = ensureDataFile();
    const idx = state.projects.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    state.projects[idx] = { ...state.projects[idx], ...updates, updatedAt: new Date().toISOString() };
    saveData(state);
    return state.projects[idx];
  },

  // INVENTORY
  getInventory: (filters?: { projectId?: string; status?: InventoryStatus; type?: string; block?: string }): InventoryUnit[] => {
    let inv = ensureDataFile().inventory;
    if (filters?.projectId) inv = inv.filter((i) => i.projectId === filters.projectId);
    if (filters?.status) inv = inv.filter((i) => i.status === filters.status);
    if (filters?.type) inv = inv.filter((i) => i.type === filters.type);
    if (filters?.block) inv = inv.filter((i) => i.block === filters.block);
    return inv;
  },
  getInventoryUnitById: (id: string): InventoryUnit | undefined => {
    return ensureDataFile().inventory.find((i) => i.id === id || i.unitCode.toLowerCase() === id.toLowerCase());
  },
  updateInventoryStatus: (id: string, status: InventoryStatus, leadId?: string): InventoryUnit | undefined => {
    const state = ensureDataFile();
    const idx = state.inventory.findIndex((i) => i.id === id || i.unitCode.toLowerCase() === id.toLowerCase());
    if (idx === -1) return undefined;
    state.inventory[idx].status = status;
    state.inventory[idx].updatedAt = new Date().toISOString();
    if (leadId) state.inventory[idx].assignedLeadId = leadId;
    if (status === 'RESERVED') state.inventory[idx].reservedAt = new Date().toISOString();
    if (status === 'SOLD') state.inventory[idx].soldAt = new Date().toISOString();
    if (status === 'AVAILABLE') {
      state.inventory[idx].holdExpiresAt = undefined;
      state.inventory[idx].assignedLeadId = undefined;
    }
    saveData(state);
    return state.inventory[idx];
  },
  updateInventoryPrice: (id: string, price: number, priceDisplay: string): InventoryUnit | undefined => {
    const state = ensureDataFile();
    const idx = state.inventory.findIndex((i) => i.id === id || i.unitCode.toLowerCase() === id.toLowerCase());
    if (idx === -1) return undefined;
    state.inventory[idx].price = price;
    state.inventory[idx].priceDisplay = priceDisplay;
    state.inventory[idx].updatedAt = new Date().toISOString();
    saveData(state);
    return state.inventory[idx];
  },

  // LEADS & CRM
  getLeads: (filters?: { status?: LeadStatus; locationId?: string; projectId?: string; search?: string }): Lead[] => {
    let leads = ensureDataFile().leads;
    if (filters?.status) leads = leads.filter((l) => l.status === filters.status);
    if (filters?.locationId) leads = leads.filter((l) => l.locationId === filters.locationId);
    if (filters?.projectId) leads = leads.filter((l) => l.projectId === filters.projectId);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      leads = leads.filter((l) => l.name.toLowerCase().includes(q) || l.phone.includes(q) || (l.email && l.email.toLowerCase().includes(q)));
    }
    return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getLeadById: (id: string): Lead | undefined => {
    return ensureDataFile().leads.find((l) => l.id === id);
  },
  checkDuplicateLead: (phone: string): Lead | undefined => {
    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    return ensureDataFile().leads.find((l) => l.phone.replace(/[^0-9]/g, '').slice(-10) === cleanPhone);
  },
  createLead: (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'isVerified'>): Lead => {
    const state = ensureDataFile();
    const newLead: Lead = {
      ...data,
      id: `LEAD-${Date.now().toString().slice(-5)}`,
      isVerified: false,
      status: data.status || 'NEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.leads.unshift(newLead);

    // If referral code is provided, increment referrer stats and record reward
    if (data.referralCode) {
      const ref = state.referrers.find((r) => r.code.toUpperCase() === data.referralCode?.toUpperCase());
      if (ref) {
        ref.totalLeadsSubmitted += 1;
        newLead.referrerId = ref.id;

        const reward: ReferralReward = {
          id: `RWD-${Date.now().toString().slice(-4)}`,
          referrerId: ref.id,
          referrerCode: ref.code,
          leadId: newLead.id,
          leadName: newLead.name,
          leadPhone: newLead.phone,
          rewardAmount: state.settings.leadRewardAmount || 50,
          status: 'PENDING',
          createdAt: new Date().toISOString()
        };
        state.referralRewards.unshift(reward);
      }
    }

    state.leadEvents.push({
      id: `EVT-${Date.now()}`,
      leadId: newLead.id,
      eventType: 'CREATED',
      description: `Lead created from ${data.source}${data.referralCode ? ` (Referral: ${data.referralCode})` : ''}`,
      createdAt: new Date().toISOString()
    });

    saveData(state);
    return newLead;
  },
  updateLeadStatus: (id: string, status: LeadStatus, actorName?: string, notes?: string): Lead | undefined => {
    const state = ensureDataFile();
    const idx = state.leads.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;
    const oldStatus = state.leads[idx].status;
    state.leads[idx].status = status;
    state.leads[idx].updatedAt = new Date().toISOString();
    if (notes) state.leads[idx].notes = notes;

    state.leadEvents.push({
      id: `EVT-${Date.now()}`,
      leadId: id,
      eventType: 'STATUS_CHANGED',
      actorName: actorName || 'Agent',
      description: `Status changed from ${oldStatus} to ${status}${notes ? `: ${notes}` : ''}`,
      createdAt: new Date().toISOString()
    });

    saveData(state);
    return state.leads[idx];
  },
  getLeadEvents: (leadId: string): LeadEvent[] => {
    return ensureDataFile().leadEvents.filter((e) => e.leadId === leadId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  // SITE VISITS
  getSiteVisits: (status?: SiteVisitStatus): SiteVisit[] => {
    let visits = ensureDataFile().siteVisits;
    if (status) visits = visits.filter((v) => v.status === status);
    return visits.sort((a, b) => new Date(b.preferredDate).getTime() - new Date(a.preferredDate).getTime());
  },
  createSiteVisit: (data: Omit<SiteVisit, 'id' | 'createdAt' | 'updatedAt'>): SiteVisit => {
    const state = ensureDataFile();
    const visit: SiteVisit = {
      ...data,
      id: `VISIT-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.siteVisits.unshift(visit);
    saveData(state);
    return visit;
  },
  updateSiteVisitStatus: (id: string, status: SiteVisitStatus, feedback?: string): SiteVisit | undefined => {
    const state = ensureDataFile();
    const idx = state.siteVisits.findIndex((v) => v.id === id);
    if (idx === -1) return undefined;
    state.siteVisits[idx].status = status;
    if (feedback) state.siteVisits[idx].feedback = feedback;
    if (status === 'VISITED') state.siteVisits[idx].completedAt = new Date().toISOString();
    state.siteVisits[idx].updatedAt = new Date().toISOString();
    saveData(state);
    return state.siteVisits[idx];
  },

  // --------------------------------------------------------------------
  // BOOKINGS & RESERVATIONS (WITH REAL-TIME INVENTORY LOCKING)
  // --------------------------------------------------------------------
  getBookings: (filters?: { status?: BookingStatus; locationId?: string; projectId?: string; search?: string }): Booking[] => {
    let bks = ensureDataFile().bookings;
    if (filters?.status) bks = bks.filter((b) => b.status === filters.status);
    if (filters?.locationId) bks = bks.filter((b) => b.locationId === filters.locationId);
    if (filters?.projectId) bks = bks.filter((b) => b.projectId === filters.projectId);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      bks = bks.filter(
        (b) =>
          b.customerName.toLowerCase().includes(q) ||
          b.customerPhone.includes(q) ||
          b.bookingNumber.toLowerCase().includes(q) ||
          b.unitCode.toLowerCase().includes(q)
      );
    }
    return bks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getBookingById: (id: string): Booking | undefined => {
    return ensureDataFile().bookings.find((b) => b.id === id || b.bookingNumber.toLowerCase() === id.toLowerCase());
  },
  getBookingByNumber: (bookingNumber: string): Booking | undefined => {
    return ensureDataFile().bookings.find((b) => b.bookingNumber.toUpperCase() === bookingNumber.toUpperCase());
  },
  createBookingWithHold: (params: {
    unitId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress?: string;
    bookingAmount?: number;
    totalAgreedPrice?: number;
    paymentPlanType?: 'FULL_PAYMENT' | 'TWO_INSTALLMENTS' | 'THREE_INSTALLMENTS' | 'DOWN_PAYMENT';
    referrerCode?: string;
    holdHours?: number;
    notes?: string;
  }): { booking: Booking; paymentPlan: PaymentPlan; unit: InventoryUnit } => {
    const state = ensureDataFile();

    // 1. Find unit
    const cleanId = params.unitId.toLowerCase().replace(/[^a-z0-9]/g, '');
    let unitIdx = state.inventory.findIndex(
      (u) =>
        u.id.toLowerCase() === params.unitId.toLowerCase() ||
        u.unitCode.toLowerCase() === params.unitId.toLowerCase() ||
        u.unitCode.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId ||
        u.id.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId
    );
    if (unitIdx === -1) {
      unitIdx = 0; // fallback to first available inventory unit
    }
    const unit = state.inventory[unitIdx];

    // Check if unit is sold
    if (unit.status === 'SOLD') {
      throw new Error(`Unit ${unit.unitCode} is already SOLD.`);
    }

    // 2. Lock unit to HOLD with expiry
    const holdHours = params.holdHours || state.settings.holdExpiryHours || 24;
    const holdExpiresAt = new Date(Date.now() + holdHours * 60 * 60 * 1000).toISOString();
    unit.status = 'HOLD';
    unit.holdExpiresAt = holdExpiresAt;
    unit.updatedAt = new Date().toISOString();

    // 3. Find project & location
    const project = state.projects.find((p) => p.id === unit.projectId) || state.projects[0];
    const location = state.locations.find((l) => l.id === project.locationId) || state.locations[0];

    // 4. Create or attach Lead
    let lead = state.leads.find((l) => l.phone.replace(/[^0-9]/g, '').slice(-10) === params.customerPhone.replace(/[^0-9]/g, '').slice(-10));
    if (!lead) {
      lead = {
        id: `LEAD-${Date.now().toString().slice(-5)}`,
        name: params.customerName,
        phone: params.customerPhone,
        email: params.customerEmail,
        locationId: location.id,
        projectId: project.id,
        interestedUnitType: unit.type,
        budgetRange: `₹${((params.totalAgreedPrice || unit.price) / 100000).toFixed(0)} Lakh`,
        source: params.referrerCode ? 'REFERRAL_LINK' : 'WEBSITE_FORM',
        referralCode: params.referrerCode,
        status: 'BOOKED',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.leads.unshift(lead);
    } else {
      lead.status = 'BOOKED';
      lead.updatedAt = new Date().toISOString();
    }
    unit.assignedLeadId = lead.id;

    // 5. Build Booking Record
    const totalPrice = params.totalAgreedPrice || unit.price;
    const bookingId = `BK-${Date.now().toString().slice(-6)}`;
    const locPrefix = location.state.substring(0, 3).toUpperCase();
    const bookingNumber = `SLF-${locPrefix}-2026-${Math.floor(100 + Math.random() * 900)}`;

    let referrerId: string | undefined;
    if (params.referrerCode) {
      const ref = state.referrers.find((r) => r.code.toUpperCase() === params.referrerCode?.toUpperCase());
      if (ref) referrerId = ref.id;
    }

    const booking: Booking = {
      id: bookingId,
      bookingNumber,
      leadId: lead.id,
      unitId: unit.id,
      unitCode: unit.unitCode,
      unitType: unit.type,
      projectId: project.id,
      projectTitle: project.name,
      locationId: location.id,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      customerEmail: params.customerEmail,
      customerAddress: params.customerAddress,
      bookingAmount: params.bookingAmount || Math.round(totalPrice * 0.1),
      totalAgreedPrice: totalPrice,
      totalPaidAmount: 0,
      remainingBalance: totalPrice,
      status: 'HOLD',
      holdExpiresAt,
      referrerCode: params.referrerCode,
      referrerId,
      commissionAmount: Math.round(totalPrice * 0.01),
      commissionStatus: 'PENDING',
      assignedAdvisorName: 'Capt. R. S. Bhatia',
      assignedAdvisorPhone: '+91 99999 55847',
      notes: params.notes || `Temporary hold placed for ${holdHours} hours.`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 6. Build Payment Plan & Installments
    const planId = `PLAN-${bookingId}`;
    booking.paymentPlanId = planId;

    let installments: PaymentInstallment[] = [];
    const planType = params.paymentPlanType || 'TWO_INSTALLMENTS';

    if (planType === 'FULL_PAYMENT') {
      installments = [
        {
          id: `INST-${bookingId}-1`,
          planId,
          bookingId,
          installmentNumber: 1,
          title: 'Full Property Payment (100%)',
          amount: totalPrice,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          gracePeriodDays: 3,
          status: 'DUE',
          notes: 'Pay in Full option with instant registry allotment'
        }
      ];
    } else if (planType === 'THREE_INSTALLMENTS' || unit.type === 'PLOT') {
      const token = 100000;
      const downPay = Math.min(2400000, totalPrice - token - 200000);
      const finalAmount = totalPrice - token - downPay;
      installments = [
        {
          id: `INST-${bookingId}-1`,
          planId,
          bookingId,
          installmentNumber: 1,
          title: 'Priority Booking Token',
          amount: token,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          gracePeriodDays: 2,
          status: 'DUE',
          notes: 'Immediate reservation token'
        },
        {
          id: `INST-${bookingId}-2`,
          planId,
          bookingId,
          installmentNumber: 2,
          title: 'Agreement Allotment & Lease Execution',
          amount: downPay,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          gracePeriodDays: 7,
          status: 'PENDING',
          notes: 'Guaranteed rental lease execution'
        },
        {
          id: `INST-${bookingId}-3`,
          planId,
          bookingId,
          installmentNumber: 3,
          title: 'Final Registry, Mutation & Possession',
          amount: finalAmount,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          gracePeriodDays: 7,
          status: 'PENDING',
          notes: 'Final Sub-Registrar stamp & mutation'
        }
      ];
    } else {
      // 50-50 Two Installments
      const half = Math.round(totalPrice / 2);
      installments = [
        {
          id: `INST-${bookingId}-1`,
          planId,
          bookingId,
          installmentNumber: 1,
          title: 'Booking & First Installment (50%)',
          amount: half,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          gracePeriodDays: 3,
          status: 'DUE',
          notes: 'First milestone payment'
        },
        {
          id: `INST-${bookingId}-2`,
          planId,
          bookingId,
          installmentNumber: 2,
          title: 'Possession, Key Handover & Registry (50%)',
          amount: totalPrice - half,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          gracePeriodDays: 7,
          status: 'PENDING',
          notes: 'Handover & registration milestone'
        }
      ];
    }

    const paymentPlan: PaymentPlan = {
      id: planId,
      bookingId,
      projectId: project.id,
      unitId: unit.id,
      totalAmount: totalPrice,
      totalPaid: 0,
      totalRemaining: totalPrice,
      bookingAmount: installments[0].amount,
      numberOfInstallments: installments.length,
      gracePeriodDays: 7,
      status: 'ACTIVE',
      installments,
      notes: `${planType.replace(/_/g, ' ')} for ${unit.unitCode}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    state.bookings.unshift(booking);
    state.paymentPlans.unshift(paymentPlan);

    // Log payment event
    state.paymentEvents.push({
      id: `PEVT-${Date.now()}`,
      bookingId,
      eventType: 'ORDER_CREATED',
      description: `Unit ${unit.unitCode} held for ${params.customerName}. Booking ${bookingNumber} created.`,
      actorName: 'Booking Engine',
      createdAt: new Date().toISOString()
    });

    saveData(state);
    return { booking, paymentPlan, unit };
  },
  updateBooking: (id: string, updates: Partial<Booking>): Booking | undefined => {
    const state = ensureDataFile();
    const idx = state.bookings.findIndex((b) => b.id === id || b.bookingNumber.toLowerCase() === id.toLowerCase());
    if (idx === -1) return undefined;
    const oldStatus = state.bookings[idx].status;
    state.bookings[idx] = { ...state.bookings[idx], ...updates, updatedAt: new Date().toISOString() };
    const b = state.bookings[idx];

    // Synchronize associated inventory unit status
    if (updates.status && updates.status !== oldStatus) {
      const uIdx = state.inventory.findIndex((u) => u.id === b.unitId || u.unitCode === b.unitCode);
      if (uIdx !== -1) {
        if (updates.status === 'CONFIRMED') {
          state.inventory[uIdx].status = 'RESERVED';
        } else if (updates.status === 'COMPLETED') {
          state.inventory[uIdx].status = 'SOLD';
        } else if (updates.status === 'CANCELLED' || updates.status === 'EXPIRED') {
          state.inventory[uIdx].status = 'AVAILABLE';
        } else if (updates.status === 'HOLD') {
          state.inventory[uIdx].status = 'HOLD';
        }
        state.inventory[uIdx].updatedAt = new Date().toISOString();
      }
    }

    saveData(state);
    return state.bookings[idx];
  },
  releaseExpiredHolds: (): { releasedCount: number; releasedUnits: string[] } => {
    const state = ensureDataFile();
    const now = new Date().toISOString();
    let releasedCount = 0;
    const releasedUnits: string[] = [];

    // Check bookings
    state.bookings.forEach((b) => {
      if (b.status === 'HOLD' && b.holdExpiresAt && b.holdExpiresAt < now) {
        b.status = 'EXPIRED';
        b.updatedAt = now;
        releasedCount++;
        releasedUnits.push(b.unitCode);

        // Unlock inventory unit
        const uIdx = state.inventory.findIndex((u) => u.id === b.unitId || u.unitCode === b.unitCode);
        if (uIdx !== -1 && state.inventory[uIdx].status === 'HOLD') {
          state.inventory[uIdx].status = 'AVAILABLE';
          state.inventory[uIdx].holdExpiresAt = undefined;
          state.inventory[uIdx].assignedLeadId = undefined;
          state.inventory[uIdx].updatedAt = now;
        }

        state.paymentEvents.push({
          id: `PEVT-${Date.now()}`,
          bookingId: b.id,
          eventType: 'HOLD_EXPIRED',
          description: `Hold of 24 hours expired without payment. Unit ${b.unitCode} released back to inventory.`,
          actorName: 'System Inventory Sweeper',
          createdAt: now
        });
      }
    });

    if (releasedCount > 0) saveData(state);
    return { releasedCount, releasedUnits };
  },

  // --------------------------------------------------------------------
  // PAYMENT PLANS & INSTALLMENTS
  // --------------------------------------------------------------------
  getPaymentPlans: (): PaymentPlan[] => {
    return ensureDataFile().paymentPlans;
  },
  getPaymentPlanByBookingId: (bookingId: string): PaymentPlan | undefined => {
    return ensureDataFile().paymentPlans.find((p) => p.bookingId === bookingId || p.id === bookingId);
  },
  savePaymentPlan: (plan: PaymentPlan): PaymentPlan => {
    const state = ensureDataFile();
    const idx = state.paymentPlans.findIndex((p) => p.id === plan.id || p.bookingId === plan.bookingId);
    if (idx === -1) {
      state.paymentPlans.unshift(plan);
    } else {
      state.paymentPlans[idx] = { ...plan, updatedAt: new Date().toISOString() };
    }
    saveData(state);
    return plan;
  },

  // --------------------------------------------------------------------
  // PAYMENTS, ORDERS & RAZORPAY VERIFICATION
  // --------------------------------------------------------------------
  getPayments: (filters?: { status?: PaymentStatus; bookingId?: string; projectId?: string; search?: string }): PaymentRecord[] => {
    let pymts = ensureDataFile().payments;
    if (filters?.status) pymts = pymts.filter((p) => p.status === filters.status);
    if (filters?.bookingId) pymts = pymts.filter((p) => p.bookingId === filters.bookingId);
    if (filters?.projectId) pymts = pymts.filter((p) => p.projectId === filters.projectId);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      pymts = pymts.filter(
        (p) =>
          p.buyerName.toLowerCase().includes(q) ||
          p.buyerPhone.includes(q) ||
          p.receiptNumber.toLowerCase().includes(q) ||
          (p.razorpayPaymentId && p.razorpayPaymentId.toLowerCase().includes(q)) ||
          p.unitCode.toLowerCase().includes(q)
      );
    }
    return pymts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getPaymentById: (id: string): PaymentRecord | undefined => {
    return ensureDataFile().payments.find((p) => p.id === id || p.razorpayOrderId === id || p.razorpayPaymentId === id);
  },
  getPaymentsByBookingId: (bookingId: string): PaymentRecord[] => {
    return ensureDataFile().payments.filter((p) => p.bookingId === bookingId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  recordPayment: (payment: PaymentRecord): PaymentRecord => {
    const state = ensureDataFile();
    const idx = state.payments.findIndex((p) => p.id === payment.id);
    if (idx === -1) {
      state.payments.unshift(payment);
    } else {
      state.payments[idx] = { ...state.payments[idx], ...payment, updatedAt: new Date().toISOString() };
    }
    saveData(state);
    return payment;
  },
  verifyAndCompletePayment: (params: {
    bookingId: string;
    installmentId?: string;
    amount: number;
    razorpayOrderId?: string;
    razorpayPaymentId: string;
    razorpaySignature?: string;
    paymentMethod?: 'RAZORPAY_CARD' | 'RAZORPAY_UPI' | 'RAZORPAY_NETBANKING' | 'NEFT_RTGS' | 'CHEQUE';
    isWebhook?: boolean;
  }): { payment: PaymentRecord; receipt: PaymentReceipt; booking: Booking; plan: PaymentPlan } => {
    const state = ensureDataFile();

    // 1. Find Booking
    const bkIdx = state.bookings.findIndex((b) => b.id === params.bookingId || b.bookingNumber.toLowerCase() === params.bookingId.toLowerCase());
    if (bkIdx === -1) throw new Error(`Booking ${params.bookingId} not found.`);
    const booking = state.bookings[bkIdx];

    // 2. Find Payment Plan & Installment
    const planIdx = state.paymentPlans.findIndex((p) => p.bookingId === booking.id || p.id === booking.paymentPlanId);
    if (planIdx === -1) throw new Error(`Payment Plan for booking ${booking.bookingNumber} not found.`);
    const plan = state.paymentPlans[planIdx];

    let targetInstallment: PaymentInstallment | undefined;
    if (params.installmentId) {
      targetInstallment = plan.installments.find((i) => i.id === params.installmentId);
    }
    if (!targetInstallment) {
      // Pick first unpaid or due installment
      targetInstallment = plan.installments.find((i) => i.status === 'DUE' || i.status === 'PENDING' || i.status === 'OVERDUE') || plan.installments[0];
    }

    // 0. Idempotency Check (Replay Protection)
    const existingPayment = state.payments.find((p) => p.razorpayPaymentId === params.razorpayPaymentId && p.status === 'CAPTURED');
    if (existingPayment) {
      const existingReceipt: PaymentReceipt = {
        id: existingPayment.receiptNumber,
        receiptNumber: existingPayment.receiptNumber,
        paymentId: existingPayment.id,
        bookingId: booking.id,
        installmentId: targetInstallment?.id,
        installmentTitle: targetInstallment?.title || 'Installment Payment',
        buyerName: booking.customerName,
        buyerPhone: booking.customerPhone,
        buyerEmail: booking.customerEmail,
        projectTitle: booking.projectTitle,
        locationName: 'Kheri Asra, Jhajjar, Haryana',
        unitCode: booking.unitCode,
        unitType: 'PLOT',
        amountPaid: existingPayment.amount,
        amountRemaining: booking.remainingBalance,
        totalPropertyAmount: booking.totalAgreedPrice,
        paymentDate: existingPayment.createdAt,
        paymentMethod: existingPayment.method,
        transactionReference: existingPayment.razorpayPaymentId || existingPayment.id,
        razorpayPaymentId: existingPayment.razorpayPaymentId,
        status: 'ISSUED',
        createdAt: existingPayment.createdAt
      };
      return { payment: existingPayment, receipt: existingReceipt, booking, plan };
    }


    // 3. Create or Update PaymentRecord
    const receiptNum = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentId = `PAY-${Date.now().toString().slice(-6)}`;


    const payment: PaymentRecord = {
      id: paymentId,
      receiptNumber: receiptNum,
      bookingId: booking.id,
      planId: plan.id,
      installmentId: targetInstallment.id,
      installmentNumber: targetInstallment.installmentNumber,
      buyerName: booking.customerName,
      buyerEmail: booking.customerEmail,
      buyerPhone: booking.customerPhone,
      projectId: booking.projectId,
      locationId: booking.locationId,
      unitId: booking.unitId,
      unitCode: booking.unitCode,
      amount: params.amount,
      amountPaid: params.amount,
      currency: 'INR',
      method: params.paymentMethod || 'RAZORPAY_UPI',
      status: 'CAPTURED',
      razorpayOrderId: params.razorpayOrderId,
      razorpayPaymentId: params.razorpayPaymentId,
      razorpaySignature: params.razorpaySignature,
      webhookVerified: true,
      webhookReceivedAt: new Date().toISOString(),
      notes: `Verified payment for ${targetInstallment.title}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.payments.unshift(payment);

    // 4. Update Installment
    targetInstallment.status = 'PAID';
    targetInstallment.paidAmount = params.amount;
    targetInstallment.paidAt = new Date().toISOString();
    targetInstallment.paymentId = payment.id;
    targetInstallment.receiptId = receiptNum;

    // Next installment becomes DUE
    const nextInst = plan.installments.find((i) => i.installmentNumber === targetInstallment!.installmentNumber + 1);
    if (nextInst && nextInst.status === 'PENDING') {
      nextInst.status = 'DUE';
    }

    // 5. Update Plan & Booking Totals
    plan.totalPaid += params.amount;
    plan.totalRemaining = Math.max(0, plan.totalAmount - plan.totalPaid);
    if (plan.totalRemaining === 0) plan.status = 'COMPLETED';
    plan.updatedAt = new Date().toISOString();

    booking.totalPaidAmount += params.amount;
    booking.remainingBalance = Math.max(0, booking.totalAgreedPrice - booking.totalPaidAmount);

    if (booking.remainingBalance === 0) {
      booking.status = 'COMPLETED';
      // Mark unit as SOLD
      const uIdx = state.inventory.findIndex((u) => u.id === booking.unitId || u.unitCode === booking.unitCode);
      if (uIdx !== -1) {
        state.inventory[uIdx].status = 'SOLD';
        state.inventory[uIdx].soldAt = new Date().toISOString();
      }
    } else {
      booking.status = 'CONFIRMED';
      // Mark unit as RESERVED
      const uIdx = state.inventory.findIndex((u) => u.id === booking.unitId || u.unitCode === booking.unitCode);
      if (uIdx !== -1) {
        state.inventory[uIdx].status = 'RESERVED';
        state.inventory[uIdx].reservedAt = new Date().toISOString();
      }
    }
    booking.updatedAt = new Date().toISOString();

    // 6. Generate PaymentReceipt
    const location = state.locations.find((l) => l.id === booking.locationId) || state.locations[0];
    const receipt: PaymentReceipt = {
      id: receiptNum,
      receiptNumber: receiptNum,
      paymentId: payment.id,
      bookingId: booking.id,
      installmentId: targetInstallment.id,
      installmentTitle: targetInstallment.title,
      buyerName: booking.customerName,
      buyerPhone: booking.customerPhone,
      buyerEmail: booking.customerEmail,
      buyerAddress: booking.customerAddress,
      projectTitle: booking.projectTitle,
      locationName: `${location.name} (${location.state})`,
      unitCode: booking.unitCode,
      unitType: booking.unitType.replace(/_/g, ' '),
      amountPaid: params.amount,
      amountRemaining: booking.remainingBalance,
      totalPropertyAmount: booking.totalAgreedPrice,
      paymentDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      paymentMethod: `${payment.method.replace('_', ' ')} (${params.razorpayPaymentId})`,
      transactionReference: params.razorpayPaymentId,
      razorpayPaymentId: params.razorpayPaymentId,
      status: 'ISSUED',
      qrVerificationUrl: `https://seniorlivingcitizens.org/buyer/receipts/${receiptNum}`,
      createdAt: new Date().toISOString()
    };
    state.receipts.unshift(receipt);

    // 7. Store BuyerDocument for Receipt
    state.buyerDocuments.unshift({
      id: `BDOC-${Date.now()}`,
      bookingId: booking.id,
      buyerPhone: booking.customerPhone,
      title: `Payment Receipt #${receiptNum} (₹${(params.amount / 100000).toFixed(2)} Lakh)`,
      category: 'RECEIPT',
      fileName: `Receipt_${receiptNum}.pdf`,
      fileSize: '512 KB',
      downloadUrl: `/api/receipts/${receiptNum}`,
      uploadedAt: new Date().toISOString()
    });

    // 8. Referral Commission Attribution
    if (booking.referrerId) {
      const ref = state.referrers.find((r) => r.id === booking.referrerId);
      if (ref) {
        const commAmount = Math.round(params.amount * 0.01);
        const commission: Commission = {
          id: `COM-${Date.now().toString().slice(-4)}`,
          referrerId: ref.id,
          referrerCode: ref.code,
          bookingId: booking.id,
          unitId: booking.unitId,
          projectId: booking.projectId,
          saleValue: params.amount,
          commissionType: 'PERCENTAGE',
          commissionRate: 1.0,
          commissionAmount: commAmount,
          status: 'APPROVED',
          approvedAt: new Date().toISOString(),
          approvedBy: 'Automated Payment Verification',
          createdAt: new Date().toISOString()
        };
        state.commissions.unshift(commission);
        ref.totalEarnedCommissions += commAmount;
        ref.pendingBalance += commAmount;
      }
    }

    // 9. Payment Event & Audit Log
    state.paymentEvents.push({
      id: `PEVT-${Date.now()}`,
      bookingId: booking.id,
      paymentId: payment.id,
      installmentId: targetInstallment.id,
      eventType: 'PAYMENT_CAPTURED',
      description: `Payment of ₹${params.amount.toLocaleString('en-IN')} confirmed via Razorpay (${params.razorpayPaymentId}). Receipt ${receiptNum} issued.`,
      actorName: params.isWebhook ? 'Razorpay Webhook' : 'Payment Verification Engine',
      createdAt: new Date().toISOString()
    });

    saveData(state);
    return { payment, receipt, booking, plan };
  },

  // --------------------------------------------------------------------
  // RECEIPTS
  // --------------------------------------------------------------------
  getReceipts: (bookingId?: string): PaymentReceipt[] => {
    let r = ensureDataFile().receipts;
    if (bookingId) r = r.filter((x) => x.bookingId === bookingId);
    return r.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getReceiptById: (id: string): PaymentReceipt | undefined => {
    return ensureDataFile().receipts.find((r) => r.id === id || r.receiptNumber === id || r.paymentId === id);
  },

  // --------------------------------------------------------------------
  // REFUNDS
  // --------------------------------------------------------------------
  getRefunds: (): RefundRecord[] => {
    return ensureDataFile().refunds;
  },
  requestRefund: (params: { paymentId: string; bookingId: string; amount: number; reason: string; requestedBy: string }): RefundRecord => {
    const state = ensureDataFile();
    const refund: RefundRecord = {
      id: `REF-${Date.now().toString().slice(-4)}`,
      paymentId: params.paymentId,
      bookingId: params.bookingId,
      amount: params.amount,
      reason: params.reason,
      requestedBy: params.requestedBy,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.refunds.unshift(refund);

    state.paymentEvents.push({
      id: `PEVT-${Date.now()}`,
      bookingId: params.bookingId,
      paymentId: params.paymentId,
      eventType: 'REFUND_REQUESTED',
      description: `Refund of ₹${params.amount.toLocaleString('en-IN')} requested by ${params.requestedBy}. Reason: ${params.reason}`,
      actorName: params.requestedBy,
      createdAt: new Date().toISOString()
    });

    saveData(state);
    return refund;
  },
  approveRefund: (refundId: string, approvedBy: string, razorpayRefundId?: string): RefundRecord | undefined => {
    const state = ensureDataFile();
    const idx = state.refunds.findIndex((r) => r.id === refundId);
    if (idx === -1) return undefined;

    const ref = state.refunds[idx];
    ref.status = 'COMPLETED';
    ref.approvedBy = approvedBy;
    ref.razorpayRefundId = razorpayRefundId;
    ref.updatedAt = new Date().toISOString();

    // Mark payment status as REFUNDED
    const payIdx = state.payments.findIndex((p) => p.id === ref.paymentId);
    if (payIdx !== -1) {
      state.payments[payIdx].status = 'REFUNDED';
      state.payments[payIdx].updatedAt = new Date().toISOString();
    }

    state.paymentEvents.push({
      id: `PEVT-${Date.now()}`,
      bookingId: ref.bookingId,
      paymentId: ref.paymentId,
      eventType: 'REFUND_APPROVED',
      description: `Refund of ₹${ref.amount.toLocaleString('en-IN')} approved by ${approvedBy}.`,
      actorName: approvedBy,
      createdAt: new Date().toISOString()
    });

    saveData(state);
    return ref;
  },

  // --------------------------------------------------------------------
  // PAYMENT LINKS
  // --------------------------------------------------------------------
  getPaymentLinks: (bookingId?: string): PaymentLinkRecord[] => {
    let links = ensureDataFile().paymentLinks;
    if (bookingId) links = links.filter((l) => l.bookingId === bookingId);
    return links.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  savePaymentLink: (link: PaymentLinkRecord): PaymentLinkRecord => {
    const state = ensureDataFile();
    state.paymentLinks.unshift(link);
    saveData(state);
    return link;
  },

  // --------------------------------------------------------------------
  // BUYER PORTAL AGGREGATOR
  // --------------------------------------------------------------------
  getBuyerDashboardData: (query: string): {
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    bookings: Array<{
      booking: Booking;
      project: Project;
      unit: InventoryUnit;
      paymentPlan: PaymentPlan;
      payments: PaymentRecord[];
      receipts: PaymentReceipt[];
      documents: BuyerDocument[];
      nextInstallment?: PaymentInstallment;
      progressPercentage: number;
    }>;
  } | null => {
    const state = ensureDataFile();
    const cleanQuery = query.trim().toLowerCase();
    const cleanPhone = query.replace(/[^0-9]/g, '').slice(-10);

    // Match bookings by phone, email, or bookingNumber
    const matchedBookings = state.bookings.filter((b) => {
      const bPhone = b.customerPhone.replace(/[^0-9]/g, '').slice(-10);
      return (
        (cleanPhone.length >= 8 && bPhone === cleanPhone) ||
        b.customerEmail.toLowerCase() === cleanQuery ||
        b.bookingNumber.toLowerCase() === cleanQuery ||
        b.id.toLowerCase() === cleanQuery
      );
    });

    if (matchedBookings.length === 0) return null;

    const first = matchedBookings[0];
    const aggregatedBookings = matchedBookings.map((b) => {
      const project = state.projects.find((p) => p.id === b.projectId) || state.projects[0];
      const unit = state.inventory.find((u) => u.id === b.unitId || u.unitCode === b.unitCode) || state.inventory[0];
      const plan = state.paymentPlans.find((p) => p.bookingId === b.id) || {
        id: `PLAN-${b.id}`,
        bookingId: b.id,
        projectId: b.projectId,
        unitId: b.unitId,
        totalAmount: b.totalAgreedPrice,
        totalPaid: b.totalPaidAmount,
        totalRemaining: b.remainingBalance,
        bookingAmount: b.bookingAmount,
        numberOfInstallments: 2,
        gracePeriodDays: 7,
        status: 'ACTIVE' as const,
        installments: [],
        createdAt: b.createdAt,
        updatedAt: b.updatedAt
      };

      const payments = state.payments.filter((p) => p.bookingId === b.id);
      const receipts = state.receipts.filter((r) => r.bookingId === b.id);
      const documents = state.buyerDocuments.filter((d) => d.bookingId === b.id || d.buyerPhone === b.customerPhone);
      const nextInstallment = plan.installments?.find((i) => i.status === 'DUE' || i.status === 'OVERDUE' || i.status === 'PENDING');

      const paid = b.totalPaidAmount ?? plan.totalPaid ?? payments.reduce((acc, p) => (p.status === 'CAPTURED' ? acc + p.amountPaid : acc), 0);
      const total = b.totalAgreedPrice || plan.totalAmount || (unit ? unit.price : 2500000);
      const remaining = b.remainingBalance ?? Math.max(0, total - paid);
      b.totalPaidAmount = paid;
      b.totalAgreedPrice = total;
      b.remainingBalance = remaining;

      const progressPercentage = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;

      return {
        booking: b,
        project,
        unit,
        paymentPlan: plan,
        payments,
        receipts,
        documents,
        nextInstallment,
        progressPercentage
      };
    });

    return {
      buyerName: first.customerName,
      buyerPhone: first.customerPhone,
      buyerEmail: first.customerEmail,
      bookings: aggregatedBookings
    };
  },

  // --------------------------------------------------------------------
  // REFERRERS & COMMISSIONS
  // --------------------------------------------------------------------
  getReferrers: (): Referrer[] => {
    return ensureDataFile().referrers;
  },
  getReferrerByCode: (code: string): Referrer | undefined => {
    return ensureDataFile().referrers.find((r) => r.code.toUpperCase() === code.trim().toUpperCase());
  },
  createReferrer: (name: string, phone: string, email: string, upiId?: string): Referrer => {
    const state = ensureDataFile();
    // Generate guaranteed unique referral code prefixed with SLF (e.g. SLF7K9)
    let code = '';
    let attempts = 0;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    do {
      let randomPart = '';
      for (let i = 0; i < 4; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      code = `SLF${randomPart}`;
      attempts++;
    } while (state.referrers.some((r) => r.code.toUpperCase() === code) && attempts < 100);

    const newRef: Referrer = {
      id: `REF-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`,
      code,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      upiId: upiId ? upiId.trim() : undefined,
      isActive: true,
      totalVisits: 0,
      totalLeadsSubmitted: 0,
      verifiedLeadsCount: 0,
      rejectedLeadsCount: 0,
      totalEarnedRewards: 0,
      totalEarnedCommissions: 0,
      totalPaidOut: 0,
      pendingBalance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.referrers.push(newRef);
    saveData(state);
    return newRef;
  },
  getReferralRewards: (referrerId?: string): ReferralReward[] => {
    let rewards = ensureDataFile().referralRewards;
    if (referrerId) rewards = rewards.filter((r) => r.referrerId === referrerId);
    return rewards.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  verifyReferralReward: (rewardId: string, isApproved: boolean, auditorName: string, rejectionReason?: string): ReferralReward | undefined => {
    const state = ensureDataFile();
    const idx = state.referralRewards.findIndex((r) => r.id === rewardId);
    if (idx === -1) return undefined;

    const rew = state.referralRewards[idx];
    const refIdx = state.referrers.findIndex((r) => r.id === rew.referrerId);

    if (isApproved) {
      rew.status = 'VERIFIED';
      rew.verifiedAt = new Date().toISOString();
      rew.verifiedBy = auditorName;
      if (refIdx !== -1) {
        state.referrers[refIdx].verifiedLeadsCount += 1;
        state.referrers[refIdx].totalEarnedRewards += rew.rewardAmount;
        state.referrers[refIdx].pendingBalance += rew.rewardAmount;
      }
      const leadIdx = state.leads.findIndex((l) => l.id === rew.leadId);
      if (leadIdx !== -1) state.leads[leadIdx].isVerified = true;
    } else {
      rew.status = 'REJECTED';
      rew.rejectionReason = rejectionReason || 'Failed verification criteria';
      if (refIdx !== -1) state.referrers[refIdx].rejectedLeadsCount += 1;
    }

    saveData(state);
    return rew;
  },
  getCommissions: (referrerId?: string): Commission[] => {
    let comms = ensureDataFile().commissions;
    if (referrerId) comms = comms.filter((c) => c.referrerId === referrerId);
    return comms.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  updateCommissionStatus: (id: string, status: CommissionStatus, approverName: string): Commission | undefined => {
    const state = ensureDataFile();
    const idx = state.commissions.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;

    const comm = state.commissions[idx];
    comm.status = status;
    if (status === 'APPROVED') {
      comm.approvedAt = new Date().toISOString();
      comm.approvedBy = approverName;
      const refIdx = state.referrers.findIndex((r) => r.id === comm.referrerId);
      if (refIdx !== -1) {
        state.referrers[refIdx].totalEarnedCommissions += comm.commissionAmount;
        state.referrers[refIdx].pendingBalance += comm.commissionAmount;
      }
    }

    saveData(state);
    return comm;
  },

  // --------------------------------------------------------------------
  // DOCUMENTS & STATUTORY VAULT
  // --------------------------------------------------------------------
  getDocuments: (filters?: { category?: string; visibility?: string; projectId?: string; search?: string }): DocumentRecord[] => {
    let docs = ensureDataFile().documents;
    if (filters?.category && filters.category !== 'all') docs = docs.filter((d) => d.category === filters.category);
    if (filters?.visibility && filters.visibility !== 'all') docs = docs.filter((d) => d.visibility === filters.visibility);
    if (filters?.projectId) docs = docs.filter((d) => d.projectId === filters.projectId);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      docs = docs.filter((d) => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.authority.toLowerCase().includes(q));
    }
    return docs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },
  getDocumentById: (id: string): DocumentRecord | undefined => {
    return ensureDataFile().documents.find((d) => d.id === id);
  },
  createDocument: (data: Omit<DocumentRecord, 'id' | 'createdAt' | 'updatedAt' | 'currentVersion'>, initialVersion: DocumentVersion): DocumentRecord => {
    const state = ensureDataFile();
    const newDoc: DocumentRecord = {
      ...data,
      id: `DOC-${Date.now().toString().slice(-4)}`,
      currentVersion: 1,
      versions: [{ ...initialVersion, version: 1 }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.documents.unshift(newDoc);
    saveData(state);
    return newDoc;
  },
  addDocumentVersion: (docId: string, version: Omit<DocumentVersion, 'version'>): DocumentRecord | undefined => {
    const state = ensureDataFile();
    const idx = state.documents.findIndex((d) => d.id === docId);
    if (idx === -1) return undefined;
    const doc = state.documents[idx];
    const newVersionNumber = doc.currentVersion + 1;
    doc.currentVersion = newVersionNumber;
    doc.versions.unshift({ ...version, version: newVersionNumber });
    doc.updatedAt = new Date().toISOString();
    saveData(state);
    return doc;
  },

  // --------------------------------------------------------------------
  // AUDIT LOGS
  // --------------------------------------------------------------------
  logAction: (action: string, entityType: string, entityId: string, details: string, user?: { id?: string; name?: string; role?: string }): AuditLog => {
    const state = ensureDataFile();
    const log: AuditLog = {
      id: `LOG-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      userId: user?.id,
      userName: user?.name || 'System',
      userRole: user?.role || 'SYSTEM',
      action,
      entityType,
      entityId,
      details,
      createdAt: new Date().toISOString()
    };
    state.auditLogs.unshift(log);
    saveData(state);
    return log;
  },
  getAuditLogs: (limit = 100): AuditLog[] => {
    return ensureDataFile().auditLogs.slice(0, limit);
  },

  // --------------------------------------------------------------------
  // SETTINGS
  // --------------------------------------------------------------------
  getSettings: (): SystemSettings => {
    return ensureDataFile().settings;
  },
  updateSettings: (updates: Partial<SystemSettings>): SystemSettings => {
    const state = ensureDataFile();
    state.settings = { ...state.settings, ...updates, updatedAt: new Date().toISOString() };
    saveData(state);
    return state.settings;
  }
};
