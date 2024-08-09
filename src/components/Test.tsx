import { restoreText } from '../hooks/charCheck';
import useTestStore from '../zustand/useTestStore';
import useTextStore from '../zustand/useTextStore';
import useTimerStore from '../zustand/useTimerStore';
import Button from './Button';
import Modal from './Modal';
import Stats from './Stats';
import Text from './Text';

const Test = () => {
  const { isTestFinished, setIsTestFinished, resetTestState } = useTestStore();
  const { text, resetTextState, setText } = useTextStore();
  const { resetSeconds } = useTimerStore();

  function restart() {
    resetSeconds();
    resetTextState();
    setText(restoreText(text));

    if (isTestFinished) {
      setIsTestFinished(false);
    }
  }

  function newTest() {
    resetTestState();
    resetTextState();
    resetSeconds();
  }

  return (
    <section className='test-container'>
      <Text />
      <Stats>
        <Button
          btnText='restart'
          onClick={restart}
          onFocus={(event) => event.target.blur()}
        />
      </Stats>
      {isTestFinished && (
        <Modal title='Test completed!'>
          <Stats />
          <Button btnText='restart' onClick={restart} />
          <Button btnText='new test' onClick={newTest} />
        </Modal>
      )}
    </section>
  );
};

export default Test;
