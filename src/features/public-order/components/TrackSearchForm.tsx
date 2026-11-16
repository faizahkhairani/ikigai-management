import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { TrackSearchQuery } from '../types';
import { cn } from "cn";
import { inputCls } from "@/lib/styles";

type Props = {
  initialValue: string;
  onSearch: (query: TrackSearchQuery) => void;
};

const TrackSearchForm = ({ initialValue, onSearch }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('No resi wajib diisi');
      return;
    }
    setError(null);
    onSearch({ resi: trimmed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field data-invalid={!!error} className="gap-2">
        <FieldLabel htmlFor="track-query" className="text-sm font-medium text-stone-700">
          No resi
        </FieldLabel>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="track-query"
            inputMode="text"
            placeholder="Nomor resi paketmu"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={!!error}
            className={cn(inputCls, "min-w-0 sm:flex-1")}
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