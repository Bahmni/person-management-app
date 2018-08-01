import React, { Component } from 'react';
import Input from '../components/Input';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Checkbox from '../components/Checkbox';
import moment from 'moment';

// Bahmni person API URL
const url = process.env.REACT_APP_URL;
const genderOptions = ['Male', 'Female', 'Other'];
const now = moment().format('YYYY-MM-DD');
// const nowSplit = now.split('-');

// 1. User inputs the date using date picker
// var dateNow = moment([2015, 11, 29]);
// var dateInputtedbyUser = moment([2007, 06, 27]);
// calculate the difference in Years Months Days
// var years = a.diff(b, 'year');
// b.add(years, 'years');

// var months = a.diff(b, 'months');
// b.add(months, 'months');

// var days = a.diff(b, 'days');

// 2. User inputs the dates using Years Months Days
// var dateNow = moment([2015, 11, 29]);
// Years Months Days
// var dateInputtedbyUser = ?

// const birthDate = moment()
//                   .subtract(this.state.dateDiff.year, 'years')
//                   .subtract(this.state.dateDiff.month, 'months')
//                   .subtract(this.state.dateDiff.day, 'days')
//                   .format("YYYY-MM-DD")

// set state and bind
class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      age: 0,
      months: 0,
      days: 0,
      birthdate: '',
      birthdateIsEstimated: false,
      dateDiff: {
        year: 0,
        month: 0,
        day: 0
      }
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
    this.setState(
      {
        dateDiff: {
          year: e.target.value
        },
        birthdate: moment()
          .subtract(e.target.value, 'years')
          .subtract(this.state.dateDiff.month, 'months')
          .subtract(this.state.dateDiff.year, 'days')
          .format('YYYY-MM-DD')
      },
      () => console.log('years', this.state.dateDiff.year)
    );
  }

  handleMonths(e) {
    this.setState(
      {
        dateDiff: {
          month: e.target.value
        },
        birthdate: moment()
          .subtract(this.state.dateDiff.year, 'years')
          .subtract(e.target.value, 'months')
          .subtract(this.state.dateDiff.day, 'days')
          .format('YYYY-MM-DD')
      },
      () => console.log('month', this.state.dateDiff.month)
    );
  }
  handleDays(e) {
    this.setState(
      {
        dateDiff: {
          day: e.target.value
        },
        birthdate: moment()
          .subtract(this.state.dateDiff.year, 'years')
          .subtract(this.state.dateDiff.month, 'months')
          .subtract(e.target.value, 'days')
          .format('YYYY-MM-DD')
      },
      () => console.log('days', this.state.dateDiff.day)
    );
  }
  handlebirthdate(e) {
    this.setState(
      {
        birthdate: e.target.value
        // age: nowSplit[0] - e.target.value.split('-')[0],
        // months: nowSplit[1] - e.target.value.split('-')[1],
        // days: nowSplit[2] - e.target.value.split('-')[2]
      },
      () => console.log('birthdate', this.state.birthdate)
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
                <div className="flex-item">
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
                </div>
                <div className="flex-item">
                  <Input
                    type={'text'}
                    title={'Middle name '}
                    name={'middleName'}
                    aria-label={'Middle name'}
                    onChange={e => this.handleMiddleName(e)}
                    value={this.state.middleName}
                    id="middleName"
                  />
                </div>
                <div className="flex-item">
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
              </div>
              <hr />
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>Age</legend>
              <div className="flex-container-row">
                <div className="flex-item2">
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
                  <Checkbox
                    title="Estimated"
                    name="birthdateIsEstimated"
                    checked={this.state.birthdateIsEstimated}
                    onChange={e => this.handleBirthdateIsEstimated(e)}
                    id="estimatedDate"
                  />
                </div>
                <div className="flex-item2">
                  <Input
                    type={'number'}
                    title={'Years '} //This is so the screen UI is Years
                    name={'age'} //The Bahmni Person API works with age
                    aria-label={'Years'}
                    aria-required="true"
                    onChange={e => this.handleAge(e)}
                    value={this.state.dateDiff.age}
                    id="age"
                    min={0}
                    max={120}
                  />
                  <Input
                    type={'number'}
                    title={'Months '}
                    name={'months'}
                    aria-label={'Months'}
                    aria-required="true"
                    onChange={e => this.handleMonths(e)}
                    value={this.state.dateDiff.month}
                    id="months"
                    min={0}
                    max={12}
                  />
                  <Input
                    type={'number'}
                    title={'Days '}
                    name={'days'}
                    aria-label={'Days'}
                    aria-required="true"
                    onChange={e => this.handleDays(e)}
                    value={this.state.dateDiff.day}
                    id="days"
                    min={0}
                    max={31}
                  />
                </div>
              </div>
              <hr />
            </fieldset>
          </div>

          <div>
            <fieldset>
              {/* <legend>Gender</legend> */}
              <div className="flex-container-row">
                <div className="flex-item">
                  <RadioButtonGroup
                    title={'Gender'}
                    name={'gender'}
                    onChange={e => this.handleGenderOptions(e)}
                    options={genderOptions}
                    checkedOption={this.state.gender}
                    id="selectGender"
                    required={true}
                  />
                </div>
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
