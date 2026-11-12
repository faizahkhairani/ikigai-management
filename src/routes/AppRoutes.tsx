import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import { AuthProvider } from '@/features/auth/components/AuthProvider';

// Layout
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const PublicLayout = lazy(() => import('@/layouts/PublicLayout'));

// Auth
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));

// Admin
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const OrderPage = lazy(() => import('@/features/order/pages/OrderPage'));
const BatchPage = lazy(() => import('@/features/batch/pages/BatchPage'));
const CustomerPage = lazy(() => import('@/features/customer/pages/CustomerPage'));

// Public (customer)
const PublicOrderPage = lazy(() => import('@/features/public-order/pages/PublicOrderPage'));
const TrackSearchPage = lazy(() => import('@/features/public-order/pages/TrackSearchPage'));
const TrackDetailPage = lazy(() => import('@/features/public-order/pages/TrackDetailPage'));

function PageLoader() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
}

// Suspense per halaman, supaya layout tidak ikut hilang saat pindah halaman
const withSuspense = (element: ReactNode, fallback: ReactNode = <PageLoader />) => (
  <Suspense fallback={fallback}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    // Hanya login + admin yang melewati pengecekan auth
    element: <AuthProvider />,
    children: [
      {
        path: '/login',
        element: (
          <GuestRoute>{withSuspense(<LoginPage />, <FullScreenLoader />)}</GuestRoute>
        ),
      },
      {
        element: (
          <ProtectedRoute>{withSuspense(<DashboardLayout />, <FullScreenLoader />)}</ProtectedRoute>
        ),
        children: [
          { path: '/', element: withSuspense(<DashboardPage />) },
          { path: '/orders', element: withSuspense(<OrderPage />) },
          { path: '/batch', element: withSuspense(<BatchPage />) },
          { path: '/customers', element: withSuspense(<CustomerPage />) },
        ],
      },
    ],
  },
  {
    // Publik: tanpa AuthProvider, tidak ada request ke /admin/me
    element: withSuspense(<PublicLayout />, <FullScreenLoader />),
    children: [
      { path: '/order-form', element: withSuspense(<PublicOrderPage />) },
      { path: '/track', element: withSuspense(<TrackSearchPage />) },
      { path: '/track/:token', element: withSuspense(<TrackDetailPage />) },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}