import { create } from 'zustand';

type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: string | null;
};

interface AuthState {
  profile: AdminProfile | null;
  isLoading: boolean;
  setProfile: (profile: AdminProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  isLoading: true,
  setProfile: (profile) => set({profile}),
  setLoading: (isLoading) => set({ isLoading }),
}));