import React, { Component } from 'react';
import Input from '../components/Input';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Checkbox from '../components/Checkbox';
import moment from 'moment';

// Bahmni person API URL
const url = process.env.REACT_APP_URL;
const genderOptions = ['Male', 'Female', 'Other'];

// set state and bind
class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthdate: moment(),
      birthdateIsEstimated: false
    };
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

  fromAgetoDate(e) {
    const momentName = e.target.name + 's';
    const inputValue = e.target.value;
    // dateDiff = {
    //   ...dateDiff,
    //   [inputName]: e.target.value
    // };
    const momentAddArg = {
      year: 'years',
      month: 'months',
      day: 'days'
    };

    this.setState(
      {
        birthdate: moment()
          .subtract(
            momentName === 'year' ? inputValue : momentAddArg.year,
            'years'
          )
          .subtract(
            momentName === 'month' ? inputValue : momentAddArg.month,
            'months'
          )
          .subtract(
            momentName === 'day' ? inputValue : momentAddArg.day,
            'days'
          )
          .format('YYYY-MM-DD')

        //Ivo code...
        // setState will trigger the render() function
        // https://reactjs.org/docs/react-component.html#setstate
        // this.setState((prevState, props) => {
        // const prevBirthdate = prevState.birthdate // 2018-08-02
        // const { prevYears, prevMonths, prevDays } = toAge(prevState.birthdate);

        // only works for changes in days currently
        // you might find a way to make this code work for the 3
        // inputs years, months, days so you only have one onChange handler
        // fromAgetoDate(), if not just make 3 separate handlers
        // example cases
        // if user increases days input from 5 to 6 = 6 - 5 = 1
        // if user decreases days input from 6 to 5 = 5 - 6 = -1
        // moment says add(-1) == subtract(1)
        // moment says subtract(-1) == add(1)
        // const diff = inputValue - prevDays;
        // const birthdate = prevState
        // .add(diff, momentAddArg[inputName])
        // .format('YYYY-MM-DD')
        // return {birthdate};
        // }
        // }
      },
      () => console.log(momentName, inputValue)
    );
  }

  // helps to calculate the age from the birthdate
  // used in the render function for the years, months, days value prop
  // used to calculate the prev years, months, days in the onChange handler of
  // the years, months, days inputs
  toAge(e) {
    const diffDuration = moment.duration(moment().diff(e.target.value));
    const age = {
      year: diffDuration.years(),
      month: diffDuration.months(),
      day: diffDuration.days()
    };
    return age;
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
      birthdateIsEstimated: false
    });
    // dateDiff = {
    //   year: 0,
    //   month: 0,
    //   day: 0
    // };
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
        <form onSubmit={e => this.handleFormSubmit(e)}>
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
            </fieldset>
          </div>
          <hr />
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
                    name={'year'} //The Bahmni Person API works with age
                    aria-label={'Years'}
                    aria-required="true"
                    onChange={e => this.fromAgetoDate(e)}
                    value={moment
                      .duration(moment().diff(this.state.birthdate))
                      .years()}
                    id="age"
                    min={0}
                    max={120}
                  />
                  <Input
                    type={'number'}
                    title={'Months '}
                    name={'month'}
                    aria-label={'Months'}
                    aria-required="true"
                    onChange={e => this.fromAgetoDate(e)}
                    value={moment
                      .duration(moment().diff(this.state.birthdate))
                      .months()}
                    id="months"
                    min={0}
                    max={11}
                  />
                  <Input
                    type={'number'}
                    title={'Days '}
                    name={'day'}
                    aria-label={'Days'}
                    aria-required="true"
                    onChange={e => this.fromAgetoDate(e)}
                    value={moment
                      .duration(moment().diff(this.state.birthdate))
                      .days()}
                    id="days"
                    min={0}
                    max={31}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <hr />
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
            </fieldset>
          </div>
          <hr />
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
