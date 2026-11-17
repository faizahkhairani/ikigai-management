import { Link } from 'react-router-dom';
import { AlertTriangle, PauseCircle, ArrowRight } from 'lucide-react';
import { cn } from 'cn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { NeedsAttention } from '../types';

function sinceLabel(iso: string) {
  const hours = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
  if (hours < 1) return 'baru saja';
  if (hours < 24) return `${hours} jam`;
  return `${Math.floor(hours / 24)} hari`;
}

type Props = {
  batchId: string;
  data: NeedsAttention;
};

export function NeedsAttentionCard({ batchId, data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="font-bold text-lg">Needs Attention</span>
          {data.total > 0 && (
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
              {data.total}
            </span>
          )}
        </CardTitle>
        <CardDescription>Order Hold dan Issue di batch ini, yang terlama di atas.</CardDescription>
      </CardHeader>

      <CardContent>
        {data.items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Semua beres, tidak ada order yang perlu ditindak.
          </p>
        ) : (
          <ul className="divide-y">
            {data.items.map((item) => {
            const isIssue = item.reason === 'ISSUE';
            const Icon = isIssue ? AlertTriangle : PauseCircle;
            return (
                <li key={item.id}>
                <Link
                    to={`/orders?batchId=${batchId}&status=${item.status}`}
                    className="flex w-full items-center gap-3 py-3 px-3 rounded-lg transition hover:bg-muted/50"
                >
                    <Icon className={cn('size-5 shrink-0', isIssue ? 'text-rose-600' : 'text-amber-600')} />
                    <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                        {item.resi} · {item.customerName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                        {isIssue
                        ? 'Issue'
                        : `Hold · ${item.paymentStatus === 'dp' ? 'baru DP' : 'belum bayar'}`}
                        {' · '}
                        {item.status.replaceAll('_', ' ')}
                    </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{sinceLabel(item.since)}</span>
                </Link>
                </li>
            );
            })}
            </ul>
        )}

        {data.total > data.items.length && (
            <div className="mt-5 border-t border-slate-100 pt-3">
                <Link
                    to={`/orders?batchId=${batchId}`}
                    className="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                >
                    Lihat semua ({data.total})
                    <ArrowRight className="size-4" />
                </Link>

            </div>
        )}
      </CardContent>
    </Card>
  );
}