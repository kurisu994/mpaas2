import { create } from 'zustand';

interface DemoState {
  counter: number;
}

type Actions = {
  increase: (by?: number) => void;
  decrement: (by?: number) => void;
};

const initialState: DemoState = {
  counter: 0,
};

export const useDemoStore = create<DemoState & Actions>()((set) => ({
  ...initialState,
  increase: (by = 1) => set((state) => ({ counter: state.counter + by })),
  decrement: (by = 1) => set((state) => ({ counter: state.counter - by })),
}));
