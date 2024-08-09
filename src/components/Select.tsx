import React, { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'select'> {
  defaultValue: string;
  options: Options[];
}

type Options = {
  value: string;
  name: string;
};

const Select: React.FC<Props> = ({ defaultValue, options, ...props }) => {
  return (
    <select
      className='uppercase-text paragraph select'
      defaultValue={defaultValue}
      {...props}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
