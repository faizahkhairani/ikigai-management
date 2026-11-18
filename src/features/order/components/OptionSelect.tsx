import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from 'cn';

const EMPTY = '__none__';

type Props<T extends string> = {
  emptyLabel: string;
  value?: T;
  options: { value: T; label: string }[];
  onChange: (value?: T) => void;
  className?: string;
};

const OptionSelect = <T extends string>({
  emptyLabel,
  value,
  options,
  onChange,
  className = 'w-44',
}: Props<T>) => {
  const items = [{ value: EMPTY, label: emptyLabel }, ...options];
  const current = items.find((item) => item.value === (value ?? EMPTY));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'group flex h-9 w-full items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-black shadow-sm outline-none transition-colors',
          'hover:bg-slate-50 focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-100',
          'ata-popup-open:border-blue-400 data-[state=open]:border-blue-400',
          'sm:w-36',
          className
        )}
      >
        <span className="truncate">{current?.label ?? emptyLabel}</span>
        <ChevronDown className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-popup-open:rotate-180 group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-40">
        <DropdownMenuRadioGroup
          value={value ?? EMPTY}
          onValueChange={(next) =>
            onChange(!next || next === EMPTY ? undefined : (next as T))
          }
        >
          {items.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionSelect;