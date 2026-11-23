export const IDENTIFIER_LABEL = 'Username WA (4 digit) / X / IG';

// " @Adhya 0160 " -> "adhya0160", sama dengan normalisasi di server
export const normalizeIdentifier = (identifier: string) =>
  identifier.toLowerCase().replace(/[\s@]/g, '');

export type CustomerContact = {
  name: string | null;
  identifier: string | null;
  phone?: string | null;
};

// Nama, identifier, dan no WA semuanya bisa kosong: pakai yang pertama terisi
export const customerLabel = ({ name, identifier, phone }: CustomerContact) =>
  name ?? identifier ?? phone ?? '-';
