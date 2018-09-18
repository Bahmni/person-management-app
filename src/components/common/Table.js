import React from 'react';
import './Table.css';
const Table = props => {
  const { data } = props;

  return (
    <table className="resultsTable">
      <thead>
        <tr className="resultsTableHeader">
          <th>NAME</th>
          <th>GENDER</th>
          <th>AGE</th>
          <th>REGISTRATION</th>
        </tr>
      </thead>
      <tbody>
        {data.map(function(item, key) {
          return (
            <tr key={key} className="resultsTableBody">
              <td>{item.display}</td>
              <td>{item.gender[0]}</td>
              <td>{item.age}</td>
              <td>{item.dateCreated.substring(0, 10)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
