import type {
  OrderDatePreset,
  OrderHeldFilter,
  OrderStatus,
  OrderType,
  PaymentStatus,
} from './types';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export const ORDER_PIPELINE: OrderStatus[] = [
  'WAITING',
  'ARRIVED_THAILAND',
  'ARRIVED_INDONESIA',
  'SORTING',
  'PACKING_QUEUE',
  'PACKING',
  'READY_TO_SHIP',
  'SHIPPED',
  'COMPLETED',
];

export const order_status_label: Record<OrderStatus, string> = {
  WAITING: 'Waiting',
  ARRIVED_THAILAND: 'Arrived Thailand',
  ARRIVED_INDONESIA: 'Arrived Indonesia',
  SORTING: 'Sorting',
  PACKING_QUEUE: 'Packing Queue',
  PACKING: 'Packing',
  READY_TO_SHIP: 'Ready to Ship',
  SHIPPED: 'Shipped',
  COMPLETED: 'Completed',
  ISSUE: 'Issue',
  CANCELLED: 'Cancelled',
};

export const order_status_class: Record<OrderStatus, string> = {
  WAITING: 'bg-gray-100 text-gray-700',
  ARRIVED_THAILAND: 'bg-emerald-100 text-emerald-500',
  ARRIVED_INDONESIA: 'text-sky-500 bg-sky-100',
  SORTING: 'bg-violet-100 text-violet-500',
  PACKING_QUEUE: 'bg-amber-100  text-amber-500',
  PACKING: 'bg-orange-100  text-orange-500',
  READY_TO_SHIP: 'bg-cyan-100  text-cyan-500',
  SHIPPED: 'bg-pink-100 text-pink-500',
  COMPLETED: 'bg-blue-100  text-blue-500',
  ISSUE: 'bg-red-100  text-red-500',
  CANCELLED: 'bg-slate-100  text-slate-500',
};

export const order_date_options: { value: OrderDatePreset; label: string }[] = [
  { value: 'today', label: 'Hari ini' },
  { value: 'month', label: 'Bulan ini' },
];

export const order_held_options: { value: OrderHeldFilter; label: string }[] = [
  { value: 'true', label: 'Hold' },
];

export const payment_status_label: Record<PaymentStatus, string> = {
  unpaid: 'Belum bayar',
  dp: 'DP',
  lunas: 'Lunas',
};

export const payment_status_variant: Record<PaymentStatus, BadgeVariant> = {
  unpaid: 'destructive',
  dp: 'secondary',
  lunas: 'default',
};

export const order_type_label: Record<OrderType, string> = {
  sharing_bagasi: 'Sharing bagasi',
  wa: 'WhatsApp',
};

// Ubah { key: label } jadi [{ value, label }] buat dropdown. Urutan key = urutan pipeline.
const toOptions = <T extends string>(labels: Record<T, string>) =>
  (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));

export const order_status_options = toOptions(order_status_label);
export const order_type_options = toOptions(order_type_label);
export const payment_status_options = toOptions(payment_status_label);