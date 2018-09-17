import React, { Component } from 'react';
import Navbar from '../components/common/Navbar';
import Input from '../components/common/Input';
import './PersonDashboard.css';

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
        <div className="searchForm">
          <legend>Search</legend>
          <div className="formGroup">
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
                    <svg
                      className="searchIcon"
                      width="24px"
                      height="24px"
                      viewBox="0 0 48 48"
                      fill="white"
                    >
                      <path
                        d="M47.2,43.8L34.3,30.9c2.5-3.2,4-7.3,4-11.7c0-10.6-8.6-19.1-19.1-19.1C8.7,0.1,0.1,8.7,0.1,19.2
	c0,10.6,8.6,19.1,19.1,19.1c4.4,0,8.5-1.5,11.7-4l12.9,12.9c0.5,0.5,1.1,0.7,1.7,0.7s1.2-0.2,1.7-0.7C48.2,46.3,48.2,44.8,47.2,43.8
	z M4.9,19.2c0-7.9,6.4-14.3,14.3-14.3s14.3,6.4,14.3,14.3c0,7.9-6.4,14.3-14.3,14.3S4.9,27.1,4.9,19.2z"
                      />
                    </svg>
                    <span className="searchButtonText">Search</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonDashboard;
