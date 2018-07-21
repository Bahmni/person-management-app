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
      middleName: '',
      lastName: '',
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

  handleMiddleName(e) {
    this.setState({ middleName: e.target.value }, () =>
      console.log('Middle Name:', this.state.lastName)
    );
  }

  handleLastName(e) {
    this.setState({ lastName: e.target.value }, () =>
      console.log('Last Name:', this.state.lastName)
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
      middleName: '',
      lastName: '',
      gender: '',
      age: 0
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      names: [
        {
          givenName: this.state.givenName + this.state.middleName,
          familyName: this.state.lastName
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
      <div className="wrapper">
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <h5>
              <img src={logo} alt="logo" /> Sign Up Form
            </h5>
          </div>
          <div>
            <fieldset>
              <legend>Name</legend>
              <div className="flex-container-row">
                <Input
                  type={'text'}
                  title={'Given name: '}
                  name={'givenName'}
                  aria-label={'Given name'}
                  aria-required="true"
                  onChange={e => this.handleGivenName(e)}
                  value={this.state.givenName}
                  id="givenName"
                  required
                />

                <Input
                  type={'text'}
                  title={'Midle name: '}
                  name={'midleName'}
                  aria-label={'Middle name'}
                  aria-required="true"
                  onChange={e => this.handleMiddleName(e)}
                  value={this.state.middleName}
                  id="middleName"
                />

                <Input
                  type={'text'}
                  title={'Last name: '}
                  name={'lastName'}
                  aria-label={'Last name'}
                  aria-required="true"
                  onChange={e => this.handleLastName(e)}
                  value={this.state.lastName}
                  id="lastName"
                />
              </div>
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>Age</legend>
              <div className="flex-container-row">
                <Input
                  type={'number'}
                  title={'Age: '}
                  name={'age'}
                  aria-label={'Age'}
                  aria-required="true"
                  onChange={e => this.handleAge(e)}
                  value={this.state.age}
                  id="age"
                />
              </div>
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>Gender</legend>
              <div className="flex-container-row">
                <RadioButtonGroup
                  title={'Please state your gender:'}
                  name={'gender'}
                  onChange={e => this.handleGenderOptions(e)}
                  type={'radio'}
                  options={this.state.genderOptions}
                  selectedOption={this.state.gender}
                  id="selectGender"
                />
              </div>
            </fieldset>
          </div>

          <input type="submit" value="Submit" />
          <button id="clearButton" onClick={this.handleClearForm}>
            Clear form
          </button>
        </form>
      </div>
    );
  }
}

export default FormContainer;
