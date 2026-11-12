import { api } from '@/lib/api';

export const authService = {
  signIn: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  signOut: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};