import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { profile, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;
  if (profile) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}