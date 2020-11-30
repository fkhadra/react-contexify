import * as React from 'react';

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string;
  data: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ name, value, data, onChange, ...rest }: SelectProps) {
  return (
    <select name={name} id={name} value={value} onChange={onChange} {...rest}>
      {data.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
