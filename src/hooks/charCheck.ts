import { TextInterface } from '../interfaces/interface';

type GetCurrentCharType = (
  charsArray: TextInterface[],
  currentIndex: number,
) => TextInterface[];

type CompareCharsType = (
  charsArray: TextInterface[],
  currentIndex: number,
  pressedKey: string,
  mistakes: number,
) => [resultArr: TextInterface[], currentIndex: number, mistakes: number];

type restoreTextInterface = (charsArray: TextInterface[]) => TextInterface[];

export const getCurrentChar: GetCurrentCharType = (
  charsArray,
  currentIndex,
) => {
  return charsArray.map((item, index) => {
    if (index === currentIndex) {
      return {
        ...item,
        class: 'current-char',
      };
    }

    return item;
  });
};

export const compareChars: CompareCharsType = (
  text,
  currentCharIndex,
  keyPressed,
  mistakes,
) => {
  const newText = [...text];
  const currentChar = newText[currentCharIndex];
  const isCorrect = currentChar.char === keyPressed;

  if (isCorrect) {
    currentChar.class = 'right-char';
  } else {
    currentChar.class = 'wrong-char';
    mistakes++;
  }

  if (currentCharIndex < text.length - 1) {
    newText[currentCharIndex + 1].class = '';
  }

  return [newText, currentCharIndex + 1, mistakes];
};

export const restoreText: restoreTextInterface = (charsArray) => {
  return charsArray.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        class: 'current-char',
      };
    }

    return {
      ...item,
      class: '',
    };
  });
};
