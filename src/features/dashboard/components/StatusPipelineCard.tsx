import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ORDER_PIPELINE, order_status_label } from '@/features/order/constants';
import type { OrderStatus } from '@/features/order/types';

type Props = {
  byStatus: Record<OrderStatus, number>;
};

const SEGMENT_COLORS = [
  'bg-pink-100',
  'bg-pink-200',
  'bg-pink-300',
  'bg-pink-400',
  'bg-pink-500',
  'bg-pink-600',
  'bg-pink-700',
  'bg-pink-800',
  'bg-pink-900',
];

const StatusPipelineCard = ({ byStatus }: Props) => {
  const total = ORDER_PIPELINE.reduce((sum, s) => sum + byStatus[s], 0);

  return (
    <Card className="rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900">Order per status</CardTitle>
        <p className="text-xs text-slate-500">Dari order masuk sampai terkirim.</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-slate-100">
          {ORDER_PIPELINE.map((status, i) =>
            byStatus[status] > 0 ? (
              <div
                key={status}
                className={`${SEGMENT_COLORS[i % SEGMENT_COLORS.length]} transition-all duration-500`}
                style={{ width: `${(byStatus[status] / total) * 100}%` }}
              />
            ) : null
          )}
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
          {ORDER_PIPELINE.map((status, i) => (
            <li key={status} className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${SEGMENT_COLORS[i % SEGMENT_COLORS.length]}`} />
              <span className="flex-1 truncate text-slate-600">{order_status_label[status]}</span>
              <span className="font-semibold text-slate-900 tabular-nums">{byStatus[status]}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default StatusPipelineCard;