// table component for displaying json response

import React from 'react';
import './Table.css';
import { useTranslation } from 'react-i18next';

const Table = props => {
  const { data } = props;
  const { t } = useTranslation();

  return (
    <div>
      <table className="resultsTable">
        <thead className="headersTable">
          <tr className="resultsTableHeader">
            <th id="headerTableName">{t('NAME', 'NAME')}</th>
            <th>{t('GENDER', 'GENDER')}</th>
            <th>{t('AGE', 'AGE')}</th>
            <th id="headerTableReg">{t('REGISTRATION', 'REGISTRATION')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map(function(item, key) {
            return (
              <tr key={key} className="resultsTableBody">
                <td id="dataTableName">{item.display}</td>
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
