import { z } from 'zod';
import { orderItemSchema } from '@/features/order/schemas';
import { IDENTIFIER_LABEL, normalizeIdentifier } from '@/lib/customer';
import { ALLOWED_IMAGE_TYPES } from '@/lib/image';

export const ORDER_LIMITS = {
  identifier: 50,
  resi: 50,
  itemName: 100,
  itemNote: 200,
  maxItems: 30,
  maxQty: 999,
};

const MAX_IMAGE_MB = 2;

export const publicOrderSchema = z.object({
  identifier: z
    .string()
    .refine((value) => normalizeIdentifier(value) !== '', `${IDENTIFIER_LABEL} wajib diisi`)
    .refine(
      (value) => normalizeIdentifier(value).length <= ORDER_LIMITS.identifier,
      `Maksimal ${ORDER_LIMITS.identifier} karakter`
    ),
  resiThailand: z.string().trim().min(1, 'No resi wajib diisi').max(ORDER_LIMITS.resi, `Maksimal ${ORDER_LIMITS.resi} karakter`),
  resiImage: z
    .custom<File | null>((value) => value instanceof File, 'Foto bukti resi wajib diunggah')
    .refine(
      (file) => !file || ALLOWED_IMAGE_TYPES.includes(file.type),
      'Foto harus berformat JPG, PNG, atau WebP'
    )
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_MB * 1024 * 1024,
      `Ukuran foto maksimal ${MAX_IMAGE_MB}MB`
    ),
  items: z.array(orderItemSchema).min(1, 'Minimal 1 barang').max(ORDER_LIMITS.maxItems, `Maksimal ${ORDER_LIMITS.maxItems} barang`),
});

export type PublicOrderFormValues = z.infer<typeof publicOrderSchema>;