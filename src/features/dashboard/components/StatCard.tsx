import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

const TONES = {
  blue: {
    card: 'bg-pastel-blue ring-blue-100',
    chip: 'bg-pastel-blue-soft text-pastel-blue-text',
  },
  mint: {
    card: 'bg-pastel-mint ring-emerald-100',
    chip: 'bg-pastel-mint-soft text-pastel-mint-text',
  },
  amber: {
    card: 'bg-pastel-amber ring-amber-100',
    chip: 'bg-pastel-amber-soft text-pastel-amber-text',
  },
  pink: {
    card: 'bg-pastel-pink ring-pink-100',
    chip: 'bg-pastel-pink-soft text-pastel-pink-text',
  },
} as const;

type Props = {
  title: string;
  value: number;
  hint?: string;
  tone?: keyof typeof TONES
  icon: LucideIcon
};

const StatCard = ({title, value, hint, icon: Icon }: Props) => {
  return(
    //  <Card className={cn('rounded-2xl border-0 py-0 shadow-none ring-1', t.card)}>
     <Card className="px-3 py-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className='text-sm font-medium'>
          {title}
        </CardTitle>
          <Icon className="size-5" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {value}
          </span>
          {hint && <span className="text-xs text-slate-500">{hint}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;