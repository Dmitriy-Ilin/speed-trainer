import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
};
const Modal: React.FC<Props> = ({ title, children }) => {
  return (
    <div className='modal-window-blackout'>
      <div className='modal-window'>
        <h2 className='big-header modal-window-text'>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
