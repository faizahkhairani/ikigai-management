import type { OrderStatus, PaymentStatus } from '@/features/order/types';

type Comparison = { current: number; previous: number | null };

type AttentionItem = {
  id: string;
  resi: string;
  customerName: string;
  status: string;
  paymentStatus: 'unpaid' | 'dp' | 'lunas';
  reason: 'ISSUE' | 'HOLD';
  since: string;
};

 export type NeedsAttention = { total: number; items: AttentionItem[] };

export type DashboardActivity = {
  id: string;
  orderId: string;
  resi: string;
  fromStatus: OrderStatus | null; // kosong = order dibuat
  toStatus: OrderStatus;
  changedAt: string;
  changedBy: string | null; // kosong = customer (form publik)
};

export type DashboardTodayOrder = {
  id: string;
  resi: string;
  customerName: string;
  itemCount: number;
  status: OrderStatus;
  createdAt: string;
};


export type DashboardSummary = {
  batch: { id: string; name: string; status: 'active' | 'closed'; startDate: string } | null;
  totalOrders: number;
  todayCount: number;
  heldCount: number;
  byStatus: Record<OrderStatus, number>;
  byPayment: Record<PaymentStatus, number>;
  recentActivity: DashboardActivity[];
  todayOrders: DashboardTodayOrder[];
  comparison: {
    totalOrders: Comparison & { elapsedDays: number };
    today: Comparison | null;
  } | null;
  needsAttention: NeedsAttention;
};

