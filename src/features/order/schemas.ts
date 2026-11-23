import { z } from 'zod';
import { normalizeIdentifier } from '@/lib/customer';

export const ORDER_LIMITS = {
  name: 100,
  identifier: 50,
  resi: 50,
  itemName: 100,
  itemNote: 200,
  maxItems: 30,
  maxQty: 999,
};

export const orderItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama barang wajib diisi')
    .max(ORDER_LIMITS.itemName, `Maksimal ${ORDER_LIMITS.itemName} karakter`),
  qty: z
    .string()
    .refine(
      (value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= ORDER_LIMITS.maxQty,
      `Jumlah 1 sampai ${ORDER_LIMITS.maxQty}`
    ),
  note: z.string().max(ORDER_LIMITS.itemNote, `Maksimal ${ORDER_LIMITS.itemNote} karakter`),
});

// Kontak customer: semua opsional, tapi minimal identifier atau no WA harus ada.
// Dipakai input order manual dan edit customer.
export const contactFields = {
  name: z.string().trim().max(ORDER_LIMITS.name, `Maksimal ${ORDER_LIMITS.name} karakter`),
  identifier: z
    .string()
    .refine(
      (value) => normalizeIdentifier(value).length <= ORDER_LIMITS.identifier,
      `Maksimal ${ORDER_LIMITS.identifier} karakter`
    ),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?[\d\s-]{9,15})?$/, 'Format no WA tidak valid'),
};

export const hasContact = ({ identifier, phone }: { identifier: string; phone: string }) =>
  normalizeIdentifier(identifier) !== '' || phone.trim() !== '';

export const contactRequired = {
  error: 'Isi minimal salah satu: identifier atau no WA',
  path: ['identifier'],
};

export const createOrderSchema = z.object({
  ...contactFields,
  resiThailand: z.string().trim().min(1, 'No resi wajib diisi').max(ORDER_LIMITS.resi, `Maksimal ${ORDER_LIMITS.resi} karakter`),
  batchId: z.string(), // string kosong = pakai batch aktif
  items: z.array(orderItemSchema).min(1, 'Minimal 1 barang').max(ORDER_LIMITS.maxItems, `Maksimal ${ORDER_LIMITS.maxItems} barang`),
}).refine(hasContact, contactRequired);

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;