import { z } from 'zod';
import { contactFields, contactRequired, hasContact } from '@/features/order/schemas';

export const ADDRESS_MAX = 300;

export const customerSchema = z.object({
  ...contactFields,
  address: z.string().max(ADDRESS_MAX, `Maksimal ${ADDRESS_MAX} karakter`),
}).refine(hasContact, contactRequired);

export type CustomerFormValues = z.infer<typeof customerSchema>;