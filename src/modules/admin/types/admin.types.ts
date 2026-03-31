// ─── Stat Cards ──────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalUsers: number;
  activeGyms: number;
  todaysCheckins: number;
  monthlyRevenue: number;
  pendingPayouts: number;
}

// ─── Revenue & Payout Snapshot ────────────────────────────────────────────────

export interface RevenueSnapshot {
  totalCollected: number;
  collectedGrowthPercent: number;
  collectedGrowthLabel: string; // e.g. "vs last month"
  totalPayable: number;
  payableNote: string; // e.g. "Pending disbursement"
  estimatedMargin: number;
  estimatedMarginPercent: number;
}

// ─── Alerts & Flags ───────────────────────────────────────────────────────────

export type AlertSeverity = 'warning' | 'danger' | 'caution';

export interface DashboardAlert {
  id: string;
  severity: AlertSeverity;
  count: number;
  title: string;
  subtitle: string;
}

// ─── Gym Status Overview (Table) ─────────────────────────────────────────────

export type GymCategory = 'Premium' | 'Standard' | 'Basic';
export type GymStatus   = 'Active'  | 'Pending'  | 'Suspended';

export interface GymOverviewRow {
  id: string;
  name: string;
  city: string;
  category: GymCategory;
  status: GymStatus;
}

// ─── Full Dashboard Data Shape ────────────────────────────────────────────────

export interface AdminDashboardData {
  stats: DashboardStats;
  revenueSnapshot: RevenueSnapshot;
  alerts: DashboardAlert[];
  gymOverview: GymOverviewRow[];
}

// ─── User Management ──────────────────────────────────────────────────────────

export type MembershipPlan   = 'Premium' | 'Standard' | 'Basic' | 'No Plan';
export type AdminUserStatus  = 'Active'  | 'Suspended';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  membershipPlan: MembershipPlan;
  expiryDate: string;        // ISO date string or 'N/A'
  totalCheckins: number;
  status: AdminUserStatus;
  /** Optimistic-update lock — true while PATCH is in-flight */
  isUpdating?: boolean;
}
