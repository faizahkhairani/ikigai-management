import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store';
import { authService } from '../services/AuthService';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profile, setProfile } = useAuthStore();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await authService.signIn(email, password);
      setProfile(data.admin); 
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.error ?? 'Gagal login'
        : 'Gagal login';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
    } finally {
      setProfile(null); 
    }
  };

  return { login, logout, isLoading, error, profile };
}