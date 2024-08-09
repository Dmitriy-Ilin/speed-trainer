import Button from './components/Button';
import Header from './components/Header';
import Modal from './components/Modal';
import Select from './components/Select';
import Test from './components/Test';
import useTestStore from './zustand/useTestStore';
import './App.css';

const App = () => {
  const { isTestStarted, setIsTestStarted } = useTestStore();
  const { sentences, setSentences } = useTestStore();
  const sentencesOptions = [
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' },
    { value: '5', name: '5' },
  ];

  const testStateToggler = () => setIsTestStarted(true);
  const changeSentences = (value: string) => setSentences(value);

  return (
    <>
      <Header />
      <main className='container main'>
        {isTestStarted ? (
          <Test />
        ) : (
          <Modal title='Take a typing test'>
            <label className='paragraph' htmlFor='select-senteces'>
              Choose number of sentences
            </label>
            <Select
              id='select-senteces'
              defaultValue={sentences}
              options={sentencesOptions}
              onChange={(event) => changeSentences(event.target.value)}
            />
            <Button btnText='start' onClick={testStateToggler} />
          </Modal>
        )}
      </main>
    </>
  );
};

export default App;

