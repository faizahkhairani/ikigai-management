import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ORDER_PIPELINE, order_status_label } from '@/features/order/constants';
import type { OrderStatus } from '@/features/order/types';

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
  const colorOf = (i: number) => SEGMENT_COLORS[i % SEGMENT_COLORS.length];

  return (
    <Card className="rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="font-bold text-lg">Order per status</CardTitle>
        <p className="text-sm text-slate-700">Dari order masuk sampai terkirim.</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-slate-100">
          {ORDER_PIPELINE.map((status, i) =>
            byStatus[status] > 0 && total > 0 ? (
              <div
                key={status}
                className="transition-all duration-500"
                style={{
                  width: `${(byStatus[status] / total) * 100}%`,
                  backgroundColor: colorOf(i),
                }}
              />
            ) : null
          )}
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
          {ORDER_PIPELINE.map((status, i) => (
            <li key={status} className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full ring-1 ring-inset ring-black/5"
                style={{ backgroundColor: colorOf(i) }}
              />
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