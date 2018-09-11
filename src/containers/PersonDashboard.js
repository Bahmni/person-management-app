import React, { Component } from 'react';
import Navbar from '../components/common/Navbar';
import Input from '../components/common/Input';

class PersonDashboard extends Component {
  state = {
    person: {
      name: ''
    },
    data: [],
    isRequestLoading: false
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleChange = ({ target: input }) => {
    const person = { ...this.state.person };
    person[input.name] = input.value;
    this.setState({ person });
  };

  handleSearch() {
    const url = process.env.REACT_APP_URL;
    const searchPerson = this.state.person.name;
    const q = '?q=' + searchPerson;
    const fullUrl = url + q;
    const customData = '&v=custom%3Adisplay%2Cbirthdate%2Cgender%2Cattributes';
    const fullUrlCustom = fullUrl + customData;

    fetch(fullUrlCustom, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  render() {
    const { isRequestLoading } = this.state;

    return (
      <div onKeyPress={this.handleKeyPress}>
        <Navbar title=" " />
        <div>
          <fieldset className="formGroup">
            <legend />
            <div className="flex-container-row">
              <div className="search-item">
                <span className="padding" />
                <Input
                  type={'text'}
                  title={'Name '}
                  name={'name'}
                  aria-label={'Name'}
                  aria-required="true"
                  onChange={this.handleChange}
                  value={this.state.name}
                  id="name"
                  required={true}
                />
              </div>
              <div className="search-button">
                {isRequestLoading ? (
                  <button>
                    <div className="spinner" />
                  </button>
                ) : (
                  <button
                    className="searchPerson-button"
                    onClick={e => this.handleSearch(e)}
                  >
                    <p className="buttonText">Search</p>
                  </button>
                )}
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default PersonDashboard;
