import { create } from 'zustand';

interface BearState {
  bears: number;
  increase: (by?: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by = 1) => set((state) => ({ bears: state.bears + by })),
}));
