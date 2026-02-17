import { create } from 'zustand';

type User = { id: string; email: string; name: string };

type AuthState = {
  user: User | null;
  setUser: (u: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));
