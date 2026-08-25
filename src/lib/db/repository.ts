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
  SEED_SETTINGS
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
      memoryDb = JSON.parse(raw) as DatabaseState;
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
        status: 'QUALIFIED',
        isVerified: true,
        rewardStatus: 'VERIFIED',
        notes: 'Interested in ground floor senior residence with proximity to proposed Ayurvedic center.',
        createdAt: '2026-02-18T10:30:00Z',
        updatedAt: '2026-02-20T14:15:00Z'
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
        notes: 'Requested private car pickup from Dwarka for weekend site walkthrough.',
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
        createdAt: '2026-02-18T10:30:00Z'
      },
      {
        id: 'EVT-02',
        leadId: 'LEAD-1001',
        eventType: 'STATUS_CHANGED',
        description: 'Status updated from NEW to QUALIFIED after introductory phone consultation.',
        actorName: 'Relationship Manager',
        createdAt: '2026-02-20T14:15:00Z'
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
    bookings: [
      {
        id: 'BK-2026-001',
        bookingNumber: 'SLCF-BK-001',
        leadId: 'LEAD-1001',
        unitId: 'PLOT-A-12',
        projectId: 'PRJ-HARYANA-01',
        customerName: 'Col. Rajesh Bakshi (Retd.)',
        customerPhone: '+91 98112 34567',
        customerEmail: 'rajesh.bakshi@gmail.com',
        bookingAmount: 500000,
        totalAgreedPrice: 2700000,
        paymentPlanSelected: 'Down Payment Plan (₹25L Upfront)',
        paymentStatus: 'TOKEN_RECEIVED',
        referrerId: 'REF-001',
        commissionAmount: 25000,
        commissionStatus: 'APPROVED',
        createdAt: '2026-02-21T11:00:00Z',
        updatedAt: '2026-02-21T11:00:00Z'
      }
    ],
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
        verifiedAt: '2026-02-19T10:00:00Z',
        verifiedBy: 'System Lead Auditor',
        createdAt: '2026-02-18T10:30:00Z'
      }
    ],
    commissions: [
      {
        id: 'COM-201',
        referrerId: 'REF-001',
        referrerCode: 'SLF8K2',
        bookingId: 'BK-2026-001',
        unitId: 'PLOT-A-12',
        projectId: 'PRJ-HARYANA-01',
        saleValue: 2700000,
        commissionType: 'PERCENTAGE',
        commissionRate: 1.0,
        commissionAmount: 27000,
        status: 'APPROVED',
        approvedAt: '2026-02-22T15:00:00Z',
        approvedBy: 'Finance Desk',
        createdAt: '2026-02-21T11:00:00Z'
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
        details: 'Initial database state seeded with Haryana & Goa sanctuaries, 64-plot inventory and statutory documents.',
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
    return projs.sort((a, b) => a.displayOrder - b.displayOrder);
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
    return ensureDataFile().inventory.find((i) => i.id === id);
  },
  updateInventoryStatus: (id: string, status: InventoryStatus, leadId?: string): InventoryUnit | undefined => {
    const state = ensureDataFile();
    const idx = state.inventory.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    state.inventory[idx].status = status;
    state.inventory[idx].updatedAt = new Date().toISOString();
    if (leadId) state.inventory[idx].assignedLeadId = leadId;
    if (status === 'RESERVED') state.inventory[idx].reservedAt = new Date().toISOString();
    if (status === 'SOLD') state.inventory[idx].soldAt = new Date().toISOString();
    saveData(state);
    return state.inventory[idx];
  },
  updateInventoryPrice: (id: string, price: number, priceDisplay: string): InventoryUnit | undefined => {
    const state = ensureDataFile();
    const idx = state.inventory.findIndex((i) => i.id === id);
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

    // Add creation event
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

  // REFERRAL PARTNERS, REWARDS & COMMISSIONS
  getReferrers: (): Referrer[] => {
    return ensureDataFile().referrers;
  },
  getReferrerByCode: (code: string): Referrer | undefined => {
    return ensureDataFile().referrers.find((r) => r.code.toUpperCase() === code.trim().toUpperCase());
  },
  createReferrer: (name: string, phone: string, email: string, upiId?: string): Referrer => {
    const state = ensureDataFile();
    const code = `SLF${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newRef: Referrer = {
      id: `REF-${Date.now().toString().slice(-4)}`,
      code,
      name,
      phone,
      email,
      upiId,
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
      // Also verify lead
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

  // DOCUMENTS
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

  // AUDIT LOGS
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

  // SETTINGS
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
