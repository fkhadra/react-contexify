import React, { ChangeEvent } from 'react';

interface SelectProps {
  name: string;
  value: string;
  data: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default ({ name, value, data, onChange }: SelectProps) => (
  <select name={name} id={name} value={value} onChange={onChange}>
    {data.map(item => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);
