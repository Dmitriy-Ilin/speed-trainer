import { useEffect, useCallback } from 'react';
import useTextStore from '../zustand/useTextStore';
import useTestStore from '../zustand/useTestStore';
import useTimerStore from '../zustand/useTimerStore';
import { getCurrentChar, compareChars } from '../hooks/charCheck';

const Text = () => {
  const {
    text,
    fetchText,
    setText,
    isLoading,
    error,
    currentCharIndex,
    mistakes,
    setMistakes,
    pressingCount,
    setCurrentCharIndex,
    increasePressingCount,
  } = useTextStore();
  const { setIsTimerOn } = useTimerStore();
  const { sentences, setIsTestFinished } = useTestStore();

  useEffect(() => {
    console.log('fetching');
    fetchText(sentences);
  }, [fetchText, sentences]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const [newText, newCurrentIndex, newMistakes] = compareChars(
        text,
        currentCharIndex,
        event.key,
        mistakes,
      );
      const updatedText = getCurrentChar(newText, newCurrentIndex);
      setText(updatedText);
      setCurrentCharIndex(newCurrentIndex);
      setMistakes(newMistakes);
      increasePressingCount();

      if (newCurrentIndex === text.length) {
        setIsTimerOn(false);
        setIsTestFinished(true);
      }
    },
    [
      text,
      currentCharIndex,
      mistakes,
      setText,
      setCurrentCharIndex,
      setMistakes,
      increasePressingCount,
      setIsTimerOn,
      setIsTestFinished,
    ],
  );

  useEffect(() => {
    if (pressingCount === 0 && text.length > 0) {
      setIsTimerOn(true);
    }

    if (currentCharIndex < text.length) {
      document.addEventListener('keypress', handleKeyPress);
      return () => {
        document.removeEventListener('keypress', handleKeyPress);
      };
    }
  }, [
    currentCharIndex,
    pressingCount,
    handleKeyPress,
    text.length,
    setIsTimerOn,
  ]);

  useEffect(() => {
    if (pressingCount === 0 && text.length > 0) {
      setIsTimerOn(true);
    }

    if (currentCharIndex < text.length) {
      document.addEventListener('keypress', handleKeyPress);
      return () => {
        document.removeEventListener('keypress', handleKeyPress);
      };
    }
  }, [
    currentCharIndex,
    pressingCount,
    handleKeyPress,
    text.length,
    setIsTimerOn,
  ]);

  return (
    <div className='test-text-wrapper'>
      {error && <p className='error-text'>{error}</p>}
      {isLoading ? (
        <p className='test-loading-text'>Loading text...</p>
      ) : (
        <div>
          {text.map((item, index) => {
            return (
              <span className={item.class} key={index}>
                {item.char}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Text;
