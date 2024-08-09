import { create } from 'zustand';
import { TextInterface } from '../interfaces/interface';
import getText from '../api/getData';

type TextState = {
  text: TextInterface[];
  isLoading: boolean;
  error: string | null | undefined;
  currentCharIndex: number;
  mistakes: number;
  pressingCount: number;
};

type TextActions = {
  fetchText: (sentences: string) => void;
  setText: (text: TextInterface[]) => void;
  setCurrentCharIndex: (currentCharIndex: number) => void;
  setMistakes: (mistakes: number) => void;
  increasePressingCount: () => void;
  resetTextState: () => void;
};

const initialState: TextState = {
  text: [],
  isLoading: false,
  error: null,
  currentCharIndex: 0,
  mistakes: 0,
  pressingCount: 0,
};

const useTextStore = create<TextState & TextActions>()((set) => ({
  ...initialState,
  fetchText: async (sentences: string) => {
    try {
      const response = await getText(sentences);
      set((state) => ({
        ...state,
        text: response.data.split('').map((item, index) => ({
          char: item,
          class: index === 0 ? 'current-char' : '',
        })),
        isLoading: false,
      }));
    } catch (e) {
      set((state) => ({ ...state, error: (e as Error).message }));
    }
  },
  setText: (text: TextInterface[]) => set((state) => ({ ...state, text })),
  setCurrentCharIndex: (currentCharIndex: number) =>
    set((state) => ({ ...state, currentCharIndex })),
  setMistakes: (mistakes: number) => set((state) => ({ ...state, mistakes })),
  increasePressingCount: () =>
    set((state) => ({ ...state, pressingCount: state.pressingCount + 1 })),
  resetTextState: () =>
    set((state) => ({
      ...state,
      currentCharIndex: 0,
      mistakes: 0,
      pressingCount: 0,
    })),
}));

export default useTextStore;
