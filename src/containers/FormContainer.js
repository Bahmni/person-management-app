import React, { Component } from 'react';
import Input from '../components/Input';
import RadioButtonGroup from '../components/RadioButtonGroup';

// Bahmni person API URL
const url = process.env.REACT_APP_URL;

// set state and bind
class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      genderOptions: ['Male', 'Female', 'Other'],
      gender: '',
      age: 0,
      birthdate: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  // handle inputs with real-time console logging
  handleFirstName(e) {
    this.setState({ firstName: e.target.value }, () =>
      console.log('First Name:', this.state.firstName)
    );
  }

  handleMiddleName(e) {
    this.setState({ middleName: e.target.value }, () =>
      console.log('Middle Name:', this.state.middleName)
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
  handlebirthdate(e) {
    this.setState({ birthdate: e.target.value }, () =>
      console.log('birthdate', this.state.birthdate)
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
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      age: 0,
      birthdate: ''
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formPayload = {
      names: [
        {
          familyName: this.state.lastName,
          givenName: this.state.firstName
        }
      ],
      gender: this.state.gender,
      age: this.state.age,
      birthdate: this.state.birthdate + 'T12:00:00.000+0000'
    };

    this.submitRequest(formPayload);
    this.handleClearForm(e);
  }

  submitRequest(formPayload) {
    console.log('Send this in a POST request:', formPayload);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formPayload),
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
          <div className="Header">
            <h5>Register New Person</h5>
          </div>
          <div>
            <fieldset>
              <legend>Name</legend>
              <div className="flex-container-row">
                <Input
                  type={'text'}
                  title={'First name '}
                  name={'firstName'}
                  aria-label={'First name'}
                  aria-required="true"
                  onChange={e => this.handleFirstName(e)}
                  value={this.state.firstName}
                  id="firstName"
                  required={true}
                />

                <Input
                  type={'text'}
                  title={'Middle name '}
                  name={'middleName'}
                  aria-label={'Middle name'}
                  onChange={e => this.handleMiddleName(e)}
                  value={this.state.middleName}
                  id="middleName"
                />

                <Input
                  type={'text'}
                  title={'Last name '}
                  name={'lastName'}
                  aria-label={'Last name'}
                  aria-required="true"
                  onChange={e => this.handleLastName(e)}
                  value={this.state.lastName}
                  id="lastName"
                  required={true}
                />
              </div>
              <hr />
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>Age</legend>
              <div className="flex-container-row">
                <Input
                  type={'date'}
                  title={'Date of Birth '}
                  name={'birthdate'}
                  aria-label={'Date of Birth'}
                  aria-required="true"
                  onChange={e => this.handlebirthdate(e)}
                  value={this.state.birthdate}
                  id="birthdate"
                  required={true}
                />

                <Input
                  type={'number'}
                  title={'Age '}
                  name={'age'}
                  aria-label={'Age'}
                  aria-required="true"
                  onChange={e => this.handleAge(e)}
                  value={this.state.age}
                  id="age"
                />
              </div>
              <hr />
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>Gender</legend>
              <div className="flex-container-row">
                <RadioButtonGroup
                  title={'Gender'}
                  name={'gender'}
                  onChange={e => this.handleGenderOptions(e)}
                  type={'radio'}
                  options={this.state.genderOptions}
                  selectedOption={this.state.gender}
                  id="selectGender"
                  required={true}
                />
              </div>
              <hr />
            </fieldset>
          </div>

          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default FormContainer;
