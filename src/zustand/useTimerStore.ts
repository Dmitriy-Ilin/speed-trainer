import { create } from 'zustand';

type TimerState = {
  isTimerOn: boolean;
  seconds: number;
};

type TimerActions = {
  setIsTimerOn: (isTimerOn: boolean) => void;
  increaseSeconds: () => void;
  resetSeconds: () => void;
};

const initialState: TimerState = {
  isTimerOn: false,
  seconds: 0,
};

const useTimerStore = create<TimerState & TimerActions>()((set) => ({
  ...initialState,
  setIsTimerOn: (isTimerOn: boolean) =>
    set((state) => ({ ...state, isTimerOn })),
  increaseSeconds: () =>
    set((state) => ({ ...state, seconds: state.seconds + 1 })),
  resetSeconds: () => set((state) => ({ ...state, seconds: 0 })),
}));

export default useTimerStore;
