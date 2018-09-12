// import React from 'react';
import Search from './Search';
// import { shallow } from 'enzyme';

describe('Search', () => {
  let search;
  const queryString =
    '?q=John&v=custom%3Adisplay%2Cbirthdate%2Cgender%2Cattributes';

  beforeEach(() => {
    search = new Search('http//test.com');
  });

  it('returns search result', () => {
    fetch = jest.fn(
      () =>
        new Promise(resolve =>
          resolve({
            results: [
              { fullname: 'john doe', age: 27 },
              { fullname: 'john dave', age: 55 }
            ]
          })
        )
    );

    search.query(queryString).then(data => {
      expect(data).toEqual([
        { name: 'john doe', age: 27 },
        { name: 'john dave', age: 55 }
      ]);
    });
  });

  it('returns no results', () => {
    fetch = jest.fn(() => new Promise(resolve => resolve({ results: [] })));

    search.query(queryString).then(data => {
      expect(data).toEqual([]);
    });
  });

  it('returns empty results when error', () => {
    fetch = jest.fn(() => new Promise(reject => reject('error')));

    search.query(queryString).then(data => {
      expect(data).toEqual([]);
    });
  });
});
