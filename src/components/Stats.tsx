import React, { useEffect, useState } from 'react';
import useTextStore from '../zustand/useTextStore';
import useTimerStore from '../zustand/useTimerStore';
import { accuracyCounting, speedCounting } from '../hooks/accuracy';

type StatsProps = {
  children?: JSX.Element | JSX.Element[];
};

const Stats: React.FC<StatsProps> = ({ children }) => {
  const { mistakes, pressingCount } = useTextStore();
  const { seconds, isTimerOn, increaseSeconds } = useTimerStore();
  const [speed, setSpeed] = useState('0.00');
  const [accuracy, setAccuracy] = useState('0.00');

  useEffect(() => {
    const correctLetters = pressingCount - mistakes;

    setAccuracy(accuracyCounting(mistakes, pressingCount));
    setSpeed(speedCounting(correctLetters, seconds));
  }, [mistakes, pressingCount, seconds]);

  useEffect(() => {
    if (isTimerOn) {
      const timer = setTimeout(() => {
        increaseSeconds();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [increaseSeconds, isTimerOn, seconds]);

  return (
    <div className='stats-container'>
      <div>
        <p className='mid-header uppercase-text stat-title'>speed</p>
        <p className='uppercase-text paragraph'>{speed} WPM</p>
      </div>
      <div>
        <p className='mid-header uppercase-text stat-title'>accuracy</p>
        <p className='uppercase-text paragraph'>{accuracy} %</p>
      </div>
      {children}
    </div>
  );
};

export default Stats;
