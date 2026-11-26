import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  order_status_label,
  order_status_class,
} from "@/features/order/constants";
import { formatTime } from "@/lib/format";
import type { DashboardTodayOrder } from "../types";

type Props = {
  orders: DashboardTodayOrder[]; // maksimal 10 terbaru
  total: number; // jumlah semua order hari ini
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "?";

const TodayOrderTable = ({ orders, total }: Props) => (
  <Card className="gap-0 overflow-hidden rounded-xl border-slate-200 py-0">
    <CardHeader className="flex flex-row items-center justify-between gap-3 px-4 py-4 sm:px-5">
      <div className="min-w-0 space-y-1">
        <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
        <CardDescription>
          Order Hold dan Issue di batch ini, yang terlama di atas.
        </CardDescription>
      </div>

      {total > 0 && (
        <Link
          to="/orders"
          className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          See All ({total})
        </Link>
      )}
    </CardHeader>

    <CardContent className="p-2">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 pb-6 text-center">
          <img
            src="/no-data-found.png"
            alt="No Data"
            className="h-35 w-35 object-contain"
          />
          <p className="mt-3 text-sm font-medium text-slate-700">
            No Order Found
          </p>
          <p className="mt-1 text-xs text-slate-700">
            There is no Data to show you right now
          </p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-slate-50/70">
                <TableHead className="px-4 sm:px-5 text-black">
                  Pelanggan
                </TableHead>
                <TableHead className="hidden md:table-cell text-black">
                  Resi
                </TableHead>
                <TableHead className="text-black">Barang</TableHead>
                <TableHead className="text-black">Waktu</TableHead>
                <TableHead className="px-4 text-right sm:px-5 text-black">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs font-semibold text-black">
                          {getInitials(order.customerName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-40 truncate font-medium">
                        {order.customerName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell">
                    {order.resi}
                  </TableCell>

                  <TableCell className="tabular-nums">
                    {order.itemCount} barang
                  </TableCell>

                  <TableCell className="text-muted-foreground tabular-nums">
                    {formatTime(order.createdAt)}
                  </TableCell>

                  <TableCell className="px-4 text-right sm:px-5">
                    <Badge className={order_status_class[order.status]}>
                      {order_status_label[order.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </CardContent>
  </Card>
);

export default TodayOrderTable;