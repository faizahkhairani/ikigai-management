import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ORDER_PIPELINE, order_status_label } from '@/features/order/constants';
import type { OrderStatus } from '@/features/order/types';
import { cn } from 'cn';

type Props = {
  byStatus: Record<OrderStatus, number>;
};

// urut sesuai ORDER_PIPELINE: Waiting → Completed
const SEGMENT_COLORS = [
  '#60A5FA', // Waiting
  '#4F83E8', // Arrived Thailand
  '#6366F1', // Arrived Indonesia
  '#818CF8', // Sorting
  '#A78BFA', // Packing Queue
  '#C084FC', // Packing
  '#E879C0', // Ready to Ship
  '#EC6B9A', // Shipped
  '#DB4B83', // Completed
];

const StatusPipelineCard = ({ byStatus }: Props) => {
  const total = ORDER_PIPELINE.reduce((sum, s) => sum + byStatus[s], 0);
  const max = Math.max(...ORDER_PIPELINE.map((s) => byStatus[s]), 1);
  const colorOf = (i: number) => SEGMENT_COLORS[i % SEGMENT_COLORS.length];

  return (
     <Card className="min-w-0 overflow-hidden rounded-2xl bg-white">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="min-w-0 space-y-1">
          <CardTitle className="text-lg font-bold">Order per status</CardTitle>
          <p className="text-sm text-slate-500">Dari order masuk sampai terkirim.</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-3xl font-extrabold leading-none tabular-nums text-slate-900">
            {total}
          </p>
          <p className="mt-1 text-xs text-slate-500">total order</p>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-3">
          {ORDER_PIPELINE.map((status, i) => {
            const count = byStatus[status];
            const percent = total > 0 ? Math.round((count / total) * 100) : 0;
            const isEmpty = count === 0;

            return (
              <li
                key={status}
                className={cn(
                  'grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_auto] items-center gap-3 text-sm',
                  isEmpty && 'opacity-50'
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full ring-1 ring-inset ring-black/5"
                    style={{ backgroundColor: colorOf(i) }}
                  />
                  <span className="truncate text-slate-600">
                    {order_status_label[status]}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(count / max) * 100}%`,
                      backgroundColor: colorOf(i),
                    }}
                  />
                </div>

                <div className="flex w-16 items-baseline justify-end gap-1.5 tabular-nums">
                  <span className="font-semibold text-slate-900">{count}</span>
                  <span className="text-xs text-slate-400">{percent}%</span>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default StatusPipelineCard;