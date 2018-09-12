class Search {
  constructor(url) {
    this.url = url;
  }

  query(query) {
    return fetch(this.url + query, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        return response.results.map(person => {
          return { name: person.fullname, age: person.age };
        });
      })
      .catch(() => []);
  }
}

export default Search;
