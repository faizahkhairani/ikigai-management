import {
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  Boxes,
  CalendarDays,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { order_status_label, order_status_class } from '@/features/order/constants';
import { formatDate } from '@/lib/format';
import type { Pagination } from '@/types/types';
import type { TrackedOrderSummary } from '../types';

type Props = {
  orders: TrackedOrderSummary[];
  isLoading: boolean;
  isFetching: boolean;
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
};

const TrackSearchResults = ({
  orders,
  isLoading,
  isFetching,
  pagination,
  onPageChange,
}: Props) => {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-44 w-full rounded-2xl bg-pink-100/70" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-pink-200 bg-white/70 px-6 py-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-pink-100 text-pink-500">
          <PackageSearch className="size-6" aria-hidden />
        </span>
        <div className="space-y-1">
          <p className="font-semibold text-stone-800">Order tidak ditemukan</p>
          <p className="text-sm text-stone-500">
            Cek lagi nomor resi, nomor WA, atau username yang kamu masukkan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="grid gap-3 sm:grid-cols-2">
        {orders.map((order) => (
          <li key={order.trackingToken}>
            <Link
              to={`/track/${order.trackingToken}`}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm shadow-pink-100/60 transition hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <div className="flex items-start gap-3">

                <div className="min-w-0 flex-1">
                  {order.customer.identifier && (
                    <p className="truncate font-semibold text-stone-800">
                      {order.customer.identifier}
                    </p>
                  )}
                  {order.customer.name && (
                    <p
                      className={
                        order.customer.identifier
                          ? 'truncate text-sm text-stone-600'
                          : 'truncate font-semibold text-stone-800'
                      }
                    >
                      {order.customer.name}
                    </p>
                  )}
                  <p className="break-all font-mono text-xs text-stone-500">
                    {order.resiThailand}
                  </p>
                </div>

                <Badge className={`shrink-0 ${order_status_class[order.status]}`}>
                  {order_status_label[order.status]}
                </Badge>
              </div>

              {/* Detail */}
              <div className="border-y border-pastel-pink-soft py-2.5">
                <dl className="grid grid-cols-3 gap-2">
                  <div className="min-w-0">
                    <dt className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-stone-500">
                      <Layers className="size-3 shrink-0" aria-hidden />
                      Batch
                    </dt>
                    <dd className="truncate text-xs font-medium text-stone-800">
                      {order.batch?.name ?? '-'}
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-stone-500">
                      <CalendarDays className="size-3 shrink-0" aria-hidden />
                      Tanggal
                    </dt>
                    <dd className="truncate text-xs font-medium text-stone-800">
                      {formatDate(order.createdAt)}
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-stone-500">
                      <Boxes className="size-3 shrink-0" aria-hidden />
                      Jumlah
                    </dt>
                    <dd className="truncate text-xs font-medium text-stone-800">
                      {order._count.items} barang
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Footer */}
              <span className="mt-auto flex items-center justify-end gap-1 text-xs font-semibold text-pink-600">
                Lihat detail
                <ChevronRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {pagination && pagination.total > 0 && (
        <div className="flex gap-3 justify-between sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-stone-500 sm:text-left">
            Menampilkan{' '}
            {(pagination.page - 1) * pagination.pageSize + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} dari{' '}
            {pagination.total} order
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1 || isFetching}
              onClick={() => onPageChange(pagination.page - 1)}
              className="h-8 rounded-full border-pink-200 px-3 text-pink-700 hover:bg-pink-50"
            >
              <ChevronLeft className="size-4" aria-hidden />
              
            </Button>
            <span className="whitespace-nowrap text-xs font-medium text-stone-600" aria-live="polite">
              {pagination.page} / {pagination.totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-pink-200 px-3 text-pink-700 hover:bg-pink-50"
              disabled={pagination.page >= pagination.totalPages || isFetching}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              
              <ChevronRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackSearchResults;