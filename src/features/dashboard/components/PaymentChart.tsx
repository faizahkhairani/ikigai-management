import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { payment_status_label } from '@/features/order/constants';
import type { PaymentStatus } from '@/features/order/types';

type Props = {
  byPayment: Record<PaymentStatus, number>;
};

const PAYMENT_ORDER: PaymentStatus[] = ['unpaid', 'dp', 'lunas'];

const chartConfig = {
  count: { label: 'Order' },
  unpaid: {
    label: payment_status_label.unpaid,
    color: '#F59E0B',
  },
  dp: {
    label: payment_status_label.dp,
    color: '#EC4899',
  },
  lunas: {
    label: payment_status_label.lunas,
    color: '#3B82F6',
  },
} satisfies ChartConfig;

const PaymentChart = ({ byPayment }: Props) => {
  const data = useMemo(
    () =>
      PAYMENT_ORDER.map((status) => ({
        status,
        count: byPayment[status],
        fill: `var(--color-${status})`,
      })),
    [byPayment]
  );

  const total = useMemo(() => data.reduce((sum, d) => sum + d.count, 0), [data]);

  return (
    <Card className="rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900">
          Pembayaran
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-65 w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status" />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={65}
              strokeWidth={4}
              paddingAngle={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="auto"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-slate-900 text-3xl font-semibold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 22}
                          className="fill-slate-500 text-xs"
                        >
                          Order
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="flex-wrap gap-2"
            />
          </PieChart>
        </ChartContainer>

        <p className="pt-1 text-center text-xs text-slate-500">
          Order yang dibatalkan tidak dihitung.
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentChart;