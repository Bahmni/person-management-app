import React, { Component } from 'react';
import Input from '../components/Input';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Checkbox from '../components/Checkbox';
import Modal from '../components/Modal/Modal';
import moment from 'moment';

// Bahmni person API URL
const url = process.env.REACT_APP_URL;

const genderOptions = ['Male', 'Female', 'Other'];

// set state
class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthdate: moment().format('YYYY-MM-DD'),
      birthdateIsEstimated: false,
      show: false
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

  handlebirthdate(e) {
    this.setState(
      {
        birthdate: e.target.value
      },
      () => console.log('birthdate', this.state.birthdate)
    );
  }

  handleBirthdateIsEstimated(e) {
    this.setState({ birthdateIsEstimated: e.target.checked }, () =>
      console.log('birthdateIsEstimated', this.state.birthdate)
    );
  }

  handleLastName(e) {
    this.setState({ lastName: e.target.value }, () =>
      console.log('Last Name:', this.state.lastName)
    );
  }
  // calculating years, months, days from date input and back
  fromAgetoDate(e) {
    // input name: years, months or days
    let inputName = e.target.name;
    // the user input for the years or months or days
    let inputValue = e.target.value;

    // mapping the values with the momentsjs required format
    const getMomentFormat = {
      year: 'years',
      month: 'months',
      day: 'days'
    };
    // takes two dates (now and current birthdate input) and calculates
    // the difference between them in years, months and days
    function toAge(date) {
      let now = moment();
      let userPickedDate = moment(date);
      const diffDuration = moment.duration(now.diff(userPickedDate));
      const age = {
        year: diffDuration.years(),
        month: diffDuration.months(),
        day: diffDuration.days()
      };
      return age;
    }

    this.setState(prevState => {
      const prevBirthdate = prevState.birthdate;

      // we avoid destructuring in this case, so that we can use the
      // toAgeObject.inputName value

      const toAgeObject = toAge(prevBirthdate);
      let diff = inputValue - toAgeObject[inputName];

      return {
        birthdate: moment(prevBirthdate)
          .subtract(diff, getMomentFormat[inputName])
          .subtract(1, 'days')
          .format('YYYY-MM-DD')
      };
    });
  } // end of fromAgetoDate

  handleGenderOptions(e) {
    this.setState({ gender: e.target.value }, () =>
      console.log('gender options', this.state.gender)
    );
  }

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthdate: moment(),
      birthdateIsEstimated: false
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
      birthdate: this.state.birthdate + 'T12:00:00.000+0000'
    };

    this.submitRequest(formPayload);
    // this.handleClearForm(e);
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
      .then(response => {
        if (response.ok) {
          console.log('BANANA is okay');
          return response.json();
        } else {
          // issue with the response
          console.log('BANANA is not okay');
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      })
      // issue with the request
      .then(response => console.log('Success:', response))
      .catch(error => console.error('Error:', error));

    // .then(res => res.json())
    // .catch(error => console.error("Error:", error))
    // .then(response => console.log("Success:", response));
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
                    max={moment().format('YYYY-MM-DD')}
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
                    title={'Years '}
                    name={'year'}
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
                    max={12}
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
              <legend id="display-none">Gender</legend>
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
              onClick={this.showModal}
            />
          </div>

          <Modal show={this.state.show} onClose={this.showModal}>
            An error occurred while trying to register this person. Please try
            again.
          </Modal>
        </form>
      </div>
    );
  }
}

export default FormContainer;
