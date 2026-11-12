import { useEffect } from 'react';
import { authService } from '../services/AuthService';
import { useAuthStore } from '../store';
import { Outlet } from 'react-router-dom';

export function AuthProvider() {
  const { setProfile, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    authService
      .me()
      .then(({ data }) => setProfile(data.admin))
      .catch(() => setProfile(null)) // 401 = belum login / cookie expired
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <><Outlet/></>;
}