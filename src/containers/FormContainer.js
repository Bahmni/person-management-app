import React, { Component } from 'react';
import Input from '../components/Input';
import RadioButtonGroup from '../components/RadioButtonGroup';
import SingleCheckbox from '../components/SingleCheckbox';

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
      months: 0,
      days: 0,
      birthdate: '',
      birthdateIsEstimated: false
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
  handleMonths(e) {
    this.setState({ months: e.target.value }, () =>
      console.log('months', this.state.months)
    );
  }
  handleDays(e) {
    this.setState({ days: e.target.value }, () =>
      console.log('days', this.state.days)
    );
  }
  handlebirthdate(e) {
    this.setState({ birthdate: e.target.value }, () =>
      console.log('birthdate', this.state.birthdate)
    );
  }

  handleBirthdateIsEstimated(e) {
    this.setState({ birthdateIsEstimated: e.target.checked }, () =>
      console.log('birthdateIsEstimated', this.state.birthdate)
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
      birthdate: '',
      birthdateIsEstimated: false,
      age: 0,
      months: 0,
      days: 0
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
    const { firstName, lastName, gender, birthdate } = this.state;
    const isEnabled =
      firstName.length > 0 &&
      lastName.length > 0 &&
      gender.length > 0 &&
      birthdate.length > 0;
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
                <SingleCheckbox
                  title="Estimated"
                  name="birthdateIsEstimated"
                  type="checkbox"
                  checked={this.state.birthdateIsEstimated}
                  onChange={e => this.handleBirthdateIsEstimated(e)}
                />

                <Input
                  type={'number'}
                  title={'Years '} //This is so the screen UI is Years
                  name={'age'} //The Bahmni Person API works with age
                  aria-label={'Years'}
                  aria-required="true"
                  onChange={e => this.handleAge(e)}
                  value={this.state.age}
                  id="age"
                />
                <Input
                  type={'number'}
                  title={'Months '}
                  name={'months'}
                  aria-label={'Months'}
                  aria-required="true"
                  onChange={e => this.handleMonths(e)}
                  value={this.state.months}
                  id="months"
                />
                <Input
                  type={'number'}
                  title={'Days '}
                  name={'days'}
                  aria-label={'Days'}
                  aria-required="true"
                  onChange={e => this.handleDays(e)}
                  value={this.state.days}
                  id="days"
                />
              </div>
              <hr />
            </fieldset>
          </div>

          <div>
            <fieldset>
              {/* <legend>Gender</legend> */}
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
          <div className="submit-button">
            <input
              disabled={isEnabled ? null : 'disabled'}
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default FormContainer;
