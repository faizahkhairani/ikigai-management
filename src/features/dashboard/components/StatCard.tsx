import { Card, CardContent } from '@/components/ui/card';
import { cn } from 'cn';
import type { LucideIcon } from 'lucide-react';
import { TrendBadge } from './TrendBadge';

const TONES = {
  blue: {
    chip: 'bg-blue-100 text-pastel-blue-text',
    label: 'text-pastel-blue-text',
  },
  mint: {
    chip: 'bg-emerald-100 text-emerald-500',
    label: 'text-emerald-500',
  },
  amber: {
    chip: 'bg-amber-100 text-amber-500',
    label: 'text-amber-500',
  },
  pink: {
    chip: 'bg-red-100 text-pastel-pink-text',
    label: 'text-pastel-pink-text',
  },
} as const;

type Props = {
  title: string;
  value: number;
  hint?: string;
  tone?: keyof typeof TONES;
  icon: LucideIcon;
  previous?: number | null;
  compareLabel?: string;
};

const StatCard = ({ title, value, hint, tone = 'blue', icon: Icon, previous, compareLabel }: Props) => {
  const t = TONES[tone];

  return (
    <Card className="bg-white border-none rounded-xl shadow-none">
      <CardContent className="flex flex-col gap-4 px-4">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex size-7 shrink-0 items-center justify-center rounded-full',
              t.chip
            )}
          >
            <Icon className="size-4" />
          </span>
          <span className="truncate text-sm font-medium text-black">
            {title}
          </span>
          {previous !== undefined && (
            <div className='ml-auto'>
              <TrendBadge current={value} previous={previous} />
            </div>
          )}
        </div>
        <div className="flex gap-2 items-end">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
            {value}
          </span>
          {hint && (
            <span className="truncate text-xs text-slate-500">{hint}</span>
          )}

        </div>
        
        {compareLabel && (
          <p className={cn('text-sm font-medium', t.label)}>{compareLabel}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;