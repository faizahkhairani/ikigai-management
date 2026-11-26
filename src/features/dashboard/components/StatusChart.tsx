import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ORDER_PIPELINE, order_status_label } from '@/features/order/constants';
import type { OrderStatus } from '@/features/order/types';

type Props = {
  byStatus: Record<OrderStatus, number>;
};

const SEGMENT_COLORS = [
  '#60A5FA', '#4F83E8', '#6366F1', '#818CF8', '#A78BFA',
  '#C084FC', '#E879C0', '#EC6B9A', '#DB4B83',
];

const chartConfig = {
  count: { label: 'Order' },
  ...Object.fromEntries(
    ORDER_PIPELINE.map((status, i) => [
      status,
      {
        label: order_status_label[status],
        color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
      },
    ])
  ),
} satisfies ChartConfig;

// Label sumbu X dipecah per kata jadi beberapa baris
const WrappedTick = ({ x, y, payload }: any) => {
  const label = chartConfig[payload.value as keyof typeof chartConfig]?.label ?? payload.value;
  const words = String(label).split(' ');

  return (
    <text x={x} y={y} textAnchor="middle" fill="#64748b" fontSize={11}>
      {words.map((word, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 14 : 13}>
          {word}
        </tspan>
      ))}
    </text>
  );
};

const StatusChart = ({ byStatus }: Props) => {
   const data = ORDER_PIPELINE.map((status) => ({
    status,
    count: byStatus[status],
    fill: `var(--color-${status})`,
  }));

  return (
    <Card className="min-w-0 overflow-hidden rounded-2xl bg-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-bold">Order per status</CardTitle>
        <p className="text-sm text-slate-500">Dari order masuk sampai terkirim.</p>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <BarChart data={data} margin={{ top: 20, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
            <XAxis
              dataKey="status"
              axisLine={false}
              tickLine={false}
              interval={0}
              height={50}
              tick={<WrappedTick />}
            />
            <ChartTooltip
              cursor={{ fill: 'rgba(241, 245, 249, 0.8)' }}
              content={<ChartTooltipContent hideLabel nameKey="status" />}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={67}>
              <LabelList
                dataKey="count"
                position="top"
                className="fill-slate-900 text-[12px] font-semibold"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StatusChart;