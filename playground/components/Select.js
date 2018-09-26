import React from 'react';

export default ({ name, value, data, onChange }) => (
  <select name={name} id={name} value={value} onChange={onChange}>
    {data.map(item => (
      <option key={item} value={item}>{item}</option>
    ))}
  </select>
);
