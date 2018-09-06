import React, { Component } from 'react';
import Input from '../components/common/Input';

class PersonDashboard extends Component {
  state = {
    person: {
      firstName: '',
      lastName: ''
    },
    data: [],
    isRequestLoading: false
  };

  handleChange = ({ target: input }) => {
    const person = { ...this.state.person };
    person[input.name] = input.value;
    this.setState({ person });
  };

  handleSearch() {
    const url = process.env.REACT_APP_URL;
    const searchPerson = this.state.person.firstName;
    const q = '?q=' + searchPerson;
    const fullUrl = url + q;
    const customData = '&v=custom%3Adisplay%2Cbirthdate%2Cgender%2Cattributes';
    const fullUrlCustom = fullUrl + customData;

    // this.setState({
    //   isRequestLoading: true
    // });
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
                  value={this.state.person.firstName}
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
                  value={this.state.person.lastName}
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
          <button
            className="addPerson-button"
            id="addPersonButton"
            onClick={e => this.handleClick(e)}
          />
        </div>
      </div>
    );
  }
}

export default PersonDashboard;
