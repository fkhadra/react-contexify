import React from 'react';

export default ({ event, handleEvent }) => {
  const table = [];
  for (let index = 0; index < 10; index++) {
    table.push(
      <tr key={index}>
        <td {...{ [`${event}`]: handleEvent }} />
        <td {...{ [`${event}`]: handleEvent }} />
        <td {...{ [`${event}`]: handleEvent }} />
        <td {...{ [`${event}`]: handleEvent }} />
        <td {...{ [`${event}`]: handleEvent }} />
      </tr>
    );
  }

  return (
    <table className="grid">
      <tbody>{table}</tbody>
    </table>
  );
};
