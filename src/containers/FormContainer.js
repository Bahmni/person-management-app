import React, { Component } from 'react';
import Input from '../components/Input';
import RadioButtonGroup from '../components/RadioButtonGroup';
import logo from './logo.png';

// Bahmni person API URL
const url = process.env.REACT_APP_URL;

// set state and bind
class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenName: '',
      familyName: '',
      genderOptions: ['Male', 'Female', 'Other'],
      gender: '',
      age: 0
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  // handle inputs with real-time console logging
  handleGivenName(e) {
    this.setState({ givenName: e.target.value }, () =>
      console.log('Given Name:', this.state.givenName)
    );
  }
  handleFamilyName(e) {
    this.setState({ familyName: e.target.value }, () =>
      console.log('Family Name:', this.state.familyName)
    );
  }
  handleAge(e) {
    this.setState({ age: e.target.value }, () =>
      console.log('age', this.state.age)
    );
  }
  handleGenderOptions(e) {
    this.setState({ gender: e.target.value }, () =>
      console.log('gender options', this.state.gender)
    );
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      givenName: '',
      familyName: '',
      gender: '',
      age: 0
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      names: [
        {
          givenName: this.state.givenName,
          familyName: this.state.familyName
        }
      ],
      gender: this.state.gender,
      age: this.state.age
    };

    this.submitRequest(formPayload);
    this.handleClearForm(e);
  }

  submitRequest(formPayload) {
    console.log('Send this in a POST request:', formPayload);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formPayload), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h5>
          <img src={logo} alt="logo" /> Sign Up Form
        </h5>
        <Input
          type={'text'}
          title={'Given name:'}
          name={'givenName'}
          aria-label={'Given name'}
          aria-required="true"
          onChange={e => this.handleGivenName(e)}
          value={this.state.givenName}
          placeholder={'Given name'}
          id="givenName"
          required
        />

        <Input
          type={'text'}
          title={'Family name:'}
          name={'familyName'}
          aria-label={'Family name'}
          aria-required="true"
          onChange={e => this.handleFamilyName(e)}
          value={this.state.familyName}
          placeholder={'Family name'}
          id="familyName"
        />

        <RadioButtonGroup
          title={'Please state your gender:'}
          name={'gender'}
          onChange={e => this.handleGenderOptions(e)}
          type={'radio'}
          options={this.state.genderOptions}
          selectedOption={this.state.gender}
          id="selectGender"
        />

        <Input
          type={'number'}
          title={'Age:'}
          name={'age'}
          aria-label={'Age'}
          aria-required="true"
          onChange={e => this.handleAge(e)}
          value={this.state.age}
          placeholder={'Age'}
          id="age"
        />

        <input type="submit" value="Submit" />
        <button id="clearButton" onClick={this.handleClearForm}>
          Clear form
        </button>
      </form>
    );
  }
}

export default FormContainer;
