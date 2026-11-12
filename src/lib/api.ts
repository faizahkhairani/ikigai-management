import axios from 'axios';
import { useAuthStore } from '@/features/auth/store';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // cookie ikut kekirim
});

let refreshing: Promise<unknown> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isAuthCall = original?.url?.includes('/auth/');

    // 401 di endpoint non-auth: access token kemungkinan expired, coba refresh sekali
    if (error.response?.status === 401 && original && !original._retry && !isAuthCall) {
      original._retry = true;
      try {
        // kalau banyak request 401 barengan, refresh cuma dipanggil sekali
        refreshing ??= api.post('/auth/refresh').finally(() => {
          refreshing = null;
        });
        await refreshing;
        return api(original); // ulang request awal
      } catch {
        // refresh gagal = sesi beneran habis
        useAuthStore.getState().setProfile(null);
      }
    }

    return Promise.reject(error);
  }
);