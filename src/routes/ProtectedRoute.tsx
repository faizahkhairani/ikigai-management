import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { profile, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;
  if (!profile) return <Navigate to="/login" replace />;

  return <>{children}</>;
}