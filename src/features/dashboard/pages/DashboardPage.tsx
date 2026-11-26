import { useState } from 'react';
import { useBatches } from '@/features/batch/hooks/useBatch';
import OptionSelect from '@/features/order/components/OptionSelect';
import DashboardSkeleton from '../components/DashboardSkeleton';
import StatCard from '../components/StatCard';
import { useDashboard } from '../hooks/useDashboard';
import { useAuthStore } from '@/features/auth/store'
import { Package, CalendarCheck, PauseCircle, AlertTriangle, Layers } from 'lucide-react';
import { cn } from "cn"
import { NeedsAttentionCard } from '../components/NeedsAttentionCard';
import TodayOrderTable from '../components/TodaysOrderTable';

const DashboardPage = () => {
  const { profile } = useAuthStore();
  const [batchId, setBatchId] = useState<string | undefined>(undefined);

  const { batches } = useBatches(); // untuk pilihan batch, diambil dari cache
  const { data, isLoading, isFetching, error } = useDashboard(batchId);

  const cmp = data?.comparison

  if (error) return <p className="text-destructive">Gagal memuat dashboard.</p>;

  const showSkeleton = isLoading || isFetching;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back, {profile?.name}
          </h1>
          <p className="text-sm text-slate-500">
            Berikut ringkasan aktivitas order terbaru.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {data?.batch && !showSkeleton && (
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium',
                data.batch.status === 'active'
                  ? 'bg-pastel-blue-soft text-pastel-blue-text'
                  : 'bg-slate-100 text-slate-600'
              )}
            >
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  data.batch.status === 'active' ? 'bg-pastel-blue-text' : 'bg-slate-400'
                )}
              />
              {data.batch.status === 'active' ? 'Active' : 'Closed'}
            </span>
          )}

          <OptionSelect
            className="w-full sm:w-64"
            emptyLabel="Pilih batch..."
            value={batchId}
            options={batches.map((batch) => ({
              value: batch.id,
              label:
                batch.status === 'closed'
                  ? `${batch.name} · Ditutup`
                  : `${batch.name} · Aktif`,
            }))}
            onChange={setBatchId}
          />
        </div>
      </header>

      {showSkeleton && <DashboardSkeleton />}

      {!showSkeleton && data && !data.batch && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-pastel-blue-dark/40 bg-pastel-blue/60 p-10 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-pastel-blue-soft text-pastel-blue-text">
            <Layers className="size-5" />
          </div>
          <p className="max-w-sm text-sm text-slate-600">
            Belum ada batch. Buka batch di halaman Batch untuk mulai menerima order.
          </p>
        </div>
      )}

      {!showSkeleton && data?.batch && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard 
            title="Active Order" 
            value={data.totalOrders} 
            hint="in total" 
            icon={Package} 
            previous={cmp?.totalOrders.previous ?? null}
            compareLabel={`vs. previous batch (${cmp?.totalOrders.elapsedDays} days in)`}
            />
            <StatCard 
            title="Orders Today"
            value={data.todayCount} 
            hint="Since 12 AM" 
            tone="mint" 
            icon={CalendarCheck}
            previous={cmp?.today?.previous ?? null}
            compareLabel="vs. yesterday, same time" 
            />
            <StatCard 
            title=" On Hold" 
            value={data.heldCount} 
            hint="Payment Pending" 
            tone="amber" 
            icon={PauseCircle} 
            compareLabel='Requires Follow Up'
            />
            <StatCard 
            title="Issue" 
            value={data.byStatus.ISSUE} 
            hint="Needs attention" 
            tone="pink" 
            icon={AlertTriangle} 
            compareLabel='Action Required'
            />
          </div>

          <div className="grid items-start gap-4 lg:grid-cols-2">
            <TodayOrderTable orders={data.todayOrders} total={data.todayCount} />
            {data.batch && (
              <NeedsAttentionCard
                batchId={data.batch.id}
                data={data.needsAttention}
              />
              )}
            {/* <StatusChart byStatus={data.byStatus} />
            <PaymentChart byPayment={data.byPayment} /> */}
          </div>

          
        </>
      )}
    </div>
  );
};

export default DashboardPage;