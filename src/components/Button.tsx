import React, { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  btnText: string;
}

const Button: React.FC<Props> = ({ btnText, ...props }) => {
  return (
    <button className='uppercase-text base-button dark-button' {...props}>
      {btnText}
    </button>
  );
};

export default Button;
