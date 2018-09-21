import React from 'react';

const Pagination = props => {
  let { itemsCount, pageSize } = props;

  let pagesCount = itemsCount / pageSize;

  function range(size, startAt = 1) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  let pages = range(pagesCount + 1);

  //[1,2,3].map

  return (
    <ul className="pagination">
      {pages.map(page => (
        <li className="page-item">
          <a className="page-link">{page}</a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
