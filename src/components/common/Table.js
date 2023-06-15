// table component for displaying json response

import React from 'react';
import './Table.css';

const Table = props => {
  const { data } = props;
  const isIframe = window.self !== window.top;

  const handleClick = async item => {
    window.parent.postMessage(item, '*');
  };

  return (
    <div>
      <table className="resultsTable">
        <thead className="headersTable">
          <tr className="resultsTableHeader">
            <th id="headerTableName">NAME</th>
            <th>GENDER</th>
            <th>AGE</th>
            <th id="headerTableReg">REGISTRATION</th>
          </tr>
        </thead>
        <tbody>
          {data.map(function(item, key) {
            return (
              <tr key={key} className="resultsTableBody">
                <td id="dataTableName">
                  <a
                    onClick={() => {
                      if (isIframe) {
                        handleClick(item);
                      }
                    }}
                  >
                    {item.display}
                  </a>
                </td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td id="dataTableReg">
                  {item.dateCreated
                    .substring(0, 10)
                    .split('-')
                    .reverse()
                    .join('/')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
