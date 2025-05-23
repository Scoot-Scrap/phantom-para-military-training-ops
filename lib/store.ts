// lib/store.ts
import { create } from "zustand";

interface AppState {
  user: { username: string; role: string } | null;
  setUser: (user: { username: string; role: string } | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
