import React, { Component } from 'react';
import Input from '../components/Input';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Checkbox from '../components/Checkbox';
import ModalError from '../components/modals/ModalError';
import ModalSuccess from '../components/modals/ModalSuccess';
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
      birthdate: '',
      birthdateIsEstimated: false,
      show: false,
      isError: false
    };
  }

  // handle inputs with real-time console logging
  handleFirstName(e) {
    this.setState({ firstName: e.target.value });
  }

  handleMiddleName(e) {
    this.setState({ middleName: e.target.value });
  }

  handlebirthdate(e) {
    this.setState({
      birthdate: e.target.value
    });
  }

  handleBirthdateIsEstimated(e) {
    this.setState({ birthdateIsEstimated: e.target.checked });
  }

  handleLastName(e) {
    this.setState({ lastName: e.target.value });
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
    this.setState({ gender: e.target.value });
  }

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  handleClearForm() {
    this.setState({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthdate: moment(),
      birthdateIsEstimated: false,
      show: false,
      isError: false
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
    // this.handleClearForm();
  }

  submitRequest(formPayload) {
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
        if (response.status === 201) {
          return response.json();
        } else {
          // issue with the response
          this.setState({ isError: true, show: true });

          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      })
      // issue with the request
      .then(response =>
        this.setState({ isError: false, show: true }, () =>
          console.log(response)
        )
      )

      .catch(error =>
        this.setState({ isError: true, show: true }, () =>
          console.error('Error:', error)
        )
      );
  }

  render() {
    const {
      firstName,
      lastName,
      gender,
      birthdate,
      isError,
      show
    } = this.state;

    let modal = null;

    const isEnabled =
      firstName.length > 0 &&
      lastName.length > 0 &&
      gender.length > 0 &&
      birthdate.length > 0;

    if (isError && show) {
      modal = (
        <ModalError show={this.state.show} onClose={this.showModal}>
          An error occurred while trying to register this person. Please try
          again.
        </ModalError>
      );
    }

    if (!isError && show) {
      modal = (
        <ModalSuccess show={this.state.show} onClose={this.showModal}>
          {firstName} {lastName} was added.
        </ModalSuccess>
      );
    }

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
            />
          </div>
          {modal}
          {/* {modalSuccess} */}
        </form>
      </div>
    );
  }
}

export default FormContainer;
