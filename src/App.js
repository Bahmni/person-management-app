import React, { Component } from 'react';
import './App.css';

// const url = "https://192.168.33.10/openmrs/ws/rest/v1/person";
// const data = {
//   "names": [
//     {
//     "display": "Sam Smith",
//     "familyName": "Smith",
//     "givenName": "Sam",
//     "preferred": false
//     }
//   ],
//   "gender": "M",
//   "age": 0,
//   "birthdate": "1989-07-01T00:00:00.000+0200",
//   "birthdateEstimated": false,
//   "dead": false,
//   "deathDate": null,
//   "causeOfDeath": null,
//   "addresses": [
//     {}
//   ],
//   "deathdateEstimated": false,
//   "birthtime": null
// }

// fetch(url, {
//   method: 'POST',
//   body: JSON.stringify(data), // data can be `string` or {object}!
//   headers:{
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   credentials: 'include'

// }).then(res => res.json())
// .catch(error => console.error('Error:', error))
// .then(response => console.log('Success:', response));

class App extends Component {
// givenName, familyName, age, gender
  state = {
    fields: {
      givenName: '',
      familyName: '',
      // age: ,
      // gender:
    },
    persons: [],
  }

  onFormSubmit = (e) => {
    // create a copy using spread (keep persons immutable) + add current input value
    const persons = [...this.state.persons, this.state.fields];
    this.setState({
      persons,
      fields: {
        // reset fields back to empty after submit
        givenName: '',
        familyName: ''
      }
    });
    // prevents from reloading
    e.preventDefault();
  };

  onInputChange = (e) => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  };

  render() {
    return (
      <div className="App">
        <h1>Sign Up Form</h1>
        <form onSubmit={this.onFormSubmit}>
          {/* given name */}
          <input
            placeholder='Given name'
            name='givenName'
            value={this.state.fields.givenName}
            onChange={this.onInputChange}
          />
          {/* family name */}
          <input
            placeholder='Family name'
            name='familyName'
            value={this.state.fields.familyName}
            onChange={this.onInputChange}
          />
          {/* submit */}
          <input type="submit"/>
        </form>
        <div>
          <h3>Submitted Persons</h3>
          <ul>
            {/* we use i to set a unique key id for each li element */}
            { this.state.persons.map(({givenName, familyName}, i) =>
              <li key={i}>{givenName} {familyName}</li>
            )}
          </ul>
        </div>

      </div>
    );
  }
}

export default App;


