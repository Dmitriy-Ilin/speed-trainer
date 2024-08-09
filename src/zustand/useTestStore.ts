import { create } from 'zustand';

type TestState = {
  isTestStarted: boolean;
  isTestFinished: boolean;
  sentences: string;
};

type TestActions = {
  setIsTestStarted: (isTestStarted: boolean) => void;
  setIsTestFinished: (isTestFinished: boolean) => void;
  setSentences: (sentences: string) => void;
  resetTestState: () => void;
};

const initialState: TestState = {
  isTestStarted: false,
  isTestFinished: false,
  sentences: '4',
};

const useTestStore = create<TestState & TestActions>()((set) => ({
  ...initialState,
  setIsTestStarted: (isTestStarted: boolean) =>
    set((state) => ({ ...state, isTestStarted })),
  setIsTestFinished: (isTestFinished: boolean) =>
    set((state) => ({ ...state, isTestFinished })),
  setSentences: (sentences: string) =>
    set((state) => ({ ...state, sentences })),
  resetTestState: () => set((state) => ({ ...state, ...initialState })),
}));

export default useTestStore;
