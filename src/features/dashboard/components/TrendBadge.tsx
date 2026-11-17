import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from 'cn';

type TrendBadgeProps = {
  current: number;
  previous: number | null | undefined;
  invert?: boolean; // true kalau naik itu buruk (order Issue, Hold)
  label?: string;
};

export function TrendBadge({ current, previous, invert = false }: TrendBadgeProps) {
  if (previous == null) {
    return <span className="text-xs text-muted-foreground">Belum ada pembanding</span>;
  }

  const diff = current - previous;
  const isFlat = diff === 0;
  const isUp = diff > 0;
  const isGood = invert ? !isUp : isUp;

  // previous = 0 tidak bisa dihitung persen, tampilkan selisih angkanya
  const text =
    previous < 10
      ? `${isUp ? '+' : ''}${diff}`
      : `${isUp ? '+' : ''}${Math.round((diff / previous) * 100)}%`;

  const Icon = isFlat ? Minus : isUp ? TrendingUp : TrendingDown;

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium',
          isFlat && 'bg-muted text-muted-foreground',
          !isFlat && isGood && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
          !isFlat && !isGood && 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
        )}
      >
        <Icon className="size-3" />
        {isFlat ? '0%' : text}
      </span>
    </div>
  );
}