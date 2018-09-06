import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';

const url = process.env.REACT_APP_URL;

class PersonDashboard extends Component {
  state = {
    person: {
      firstName: '',
      lastName: ''
    },
    isRequestLoading: false
  };

  //   handleSearch = e => {
  //     e.preventDefault();

  //     fetch(url, {
  //       method: "GET",
  //       body: JSON.stringify(searchPayload),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       },
  //       credentials: "include"}

  //   handleClick = e => {

  //   }

  render() {
    const { isRequestLoading } = this.state;

    return (
      <div>
        <hr />
        <div>
          <fieldset>
            <legend>Name</legend>
            <div className="flex-container-row">
              <div className="flex-item">
                <Input
                  type={'text'}
                  title={'First name '}
                  name={'firstName'}
                  aria-label={'First name'}
                  aria-required="true"
                  onChange={this.handleChange}
                  value={this.props.firstName}
                  id="firstName"
                  required={true}
                />
              </div>
              <div className="flex-item">
                <Input
                  type={'text'}
                  title={'Last name '}
                  name={'lastName'}
                  aria-label={'Last name'}
                  aria-required="true"
                  onChange={this.handleChange}
                  value={this.props.lastName}
                  id="lastName"
                  required={true}
                />
              </div>
            </div>
          </fieldset>

          <div className="search-button">
            {isRequestLoading ? (
              <button>
                <div className="spinner" />
              </button>
            ) : (
              <button
                className="searchPerson-button"
                onClick={e => this.handleSearch(e)}
              />
            )}
            <hr />
          </div>
          <div />
          <Link to="/person/new" className="addPersonLink">
            <div className="addPerson">
              <div className="addPersonSvg" />
              <p>Register new person</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default PersonDashboard;
