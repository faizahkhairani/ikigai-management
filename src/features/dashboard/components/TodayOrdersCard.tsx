import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { order_status_label, order_status_variant } from '@/features/order/constants';
import { formatTime } from '@/lib/format';
import type { DashboardTodayOrder } from '../types';
import { ArrowRight, ShoppingBag } from 'lucide-react';

type Props = {
  orders: DashboardTodayOrder[]; // maksimal 10 terbaru
  total: number; // jumlah semua order hari ini
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('') || '?';

const TodayOrdersCard = ({ orders, total }: Props) => (
  <Card className="gap-0 overflow-hidden rounded-xl border-slate-200 py-0">
    <CardHeader className="flex flex-row items-center justify-between gap-3 px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-1">
        <CardTitle className="text-base font-semibold tracking-tight text-slate-900">
          Recent Orders
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Daftar pesanan yang diterima hari ini.
        </p>
      </div>
    </CardHeader>

    <CardContent className="px-4 pb-4 sm:px-5">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag className="size-5 text-slate-400" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Belum ada order masuk
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pesanan yang masuk hari ini akan ditampilkan di sini.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-black">{getInitials(order.customerName)}</AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0 space-y-1">
                    <p className="truncate text-sm leading-none font-medium">
                      {order.customerName}
                    </p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {order.resi}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.itemCount} barang
                      <span className="mx-1.5">·</span>
                      {formatTime(order.createdAt)}
                    </p>
                  </div>

                  <Badge
                    variant={order_status_variant[order.status]}
                    className="shrink-0"
                  >
                    {order_status_label[order.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {total > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-3">
              <Link
                to="/orders"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
              >
                Lihat semua order ({total})
                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </CardContent>
  </Card>
);

export default TodayOrdersCard;