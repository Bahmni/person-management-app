import React from 'react';
import './Pagination.css';

const Pagination = props => {
  let { itemsCount, pageSize } = props;

  let pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = [...Array(pagesCount).keys()].map(i => i + 1);
  if (pages === 1) return null;

  return (
    <div className="navPageContainer">
      <ul className="pagination">
        {pages.map(page => (
          <li className="page-item">
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
