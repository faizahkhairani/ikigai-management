import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { IDENTIFIER_LABEL, normalizeIdentifier } from '@/lib/customer';
import type { TrackSearchQuery } from '../types';
import { cn } from "cn";

export type TrackSearchMode = 'resi' | 'phone' | 'identifier';

// tab = teks pendek di tombol pilihan, label = teks di atas input
const MODE_CONFIG: Record<
  TrackSearchMode,
  { tab: string; label: string; placeholder: string; inputMode: 'text' | 'tel' }
> = {
  resi: { tab: 'No resi', label: 'No resi', placeholder: 'Nomor resi paketmu', inputMode: 'text' },
  phone: { tab: 'No WA', label: 'No WhatsApp', placeholder: '08123456789', inputMode: 'tel' },
  identifier: {
    tab: 'Username',
    label: IDENTIFIER_LABEL,
    placeholder: 'Contoh: adhya0160',
    inputMode: 'text',
  },
};

type Props = {
  initialMode: TrackSearchMode;
  initialValue: string;
  onSearch: (query: TrackSearchQuery) => void;
};

const TrackSearchForm = ({ initialMode, initialValue, onSearch }: Props) => {
  const [mode, setMode] = useState(initialMode)
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const config = MODE_CONFIG[mode];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = mode === 'identifier' ? normalizeIdentifier(value) : value.trim();
    if (!trimmed) {
      setError(`${config.label} wajib diisi`);
      return;
    }
    setError(null);
    onSearch({ [mode]: trimmed } as TrackSearchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-1 rounded-full bg-pastel-pink p-1">
        {(Object.keys(MODE_CONFIG) as TrackSearchMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setMode(key);
              setError(null);
            }}
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-all",
              mode === key
                ? "bg-pastel-pink-dark text-white"
                : "text-stone-500 hover:text-stone-800"
            )}
          >
            {MODE_CONFIG[key].tab}
          </button>
        ))}
      </div>
      <Field data-invalid={!!error} className="gap-2">
        <FieldLabel htmlFor="track-query" className="text-sm font-medium text-stone-700">
          {config.label}
        </FieldLabel>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="track-query"
            inputMode={config.inputMode}
            autoCapitalize="none"
            placeholder={config.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={!!error}
            className="h-11 rounded-xl border-stone-200 bg-white"
          />

          <Button
            type="submit"
            variant="pink"
            className="h-10 w-full shrink-0 rounded-full px-6 font-medium sm:w-auto"
          >
            <Search className="mr-2 size-4" />
            Cari order
          </Button>
        </div>

        {error && <FieldError>{error}</FieldError>}
      </Field>
    </form>
  );
};

export default TrackSearchForm;