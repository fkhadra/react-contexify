import React from 'react';

export default ({ event, handleEvent }) => {
  const table = [];
  for (let index = 0; index < 10; index++) {
    table.push(
      <tr key={index}>
        {[...Array(5).keys()].map(k => <td key={k} {...{ [`${event}`]: handleEvent }} />)}
      </tr>
    );
  }

  return (
    <div>
      This is a table
    <table className="grid">
      <tbody>{table}</tbody>
    </table>
    </div>
  );
};
