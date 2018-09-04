import React, { Component } from 'react';
import Input from '../components/common/Input';
import RadioButtonGroup from '../components/common/RadioButtonGroup';
import Checkbox from '../components/common/Checkbox';
import ModalError from '../components/modals/ModalError';
import ModalSuccess from '../components/modals/ModalSuccess';
import moment from 'moment';

// Bahmni person API URL
const url = process.env.REACT_APP_URL;
const genderOptions = ['Male', 'Female', 'Other'];

// set state
class FormContainer extends Component {
  state = {
    person: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthdate: moment(),
      birthdateEstimated: false
    },
    showModal: false,
    isRequestError: false,
    isRequestLoading: false,
    lastCreatedPerson: ''
  };

  handleChange = ({ target: input }) => {
    const person = { ...this.state.person };
    person[input.name] = input.value;
    this.setState({ person });
  };

  handleCheckbox = ({ target: input }) => {
    const person = { ...this.state.person };
    person[input.name] = input.checked;
    this.setState({ person });
  };

  hideModal = () => {
    this.setState({
      showModal: false
    });
  };

  fromAgetoDate = e => {
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
      const prevBirthdate = prevState.person.birthdate;

      const toAgeObject = toAge(prevBirthdate);
      let diff = inputValue - toAgeObject[inputName];

      const person = { ...this.state.person };
      person.birthdate = moment(prevBirthdate)
        .subtract(diff, getMomentFormat[inputName])
        .subtract(1, 'days')
        .format('YYYY-MM-DD');

      return {
        person
      };
    });
  };

  handleClearForm() {
    this.setState({
      person: {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        birthdate: moment(),
        birthdateEstimated: false
      },
      isRequestError: false
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      gender,
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const formPayload = {
      names: [
        {
          familyName: lastName,
          givenName: firstName
        }
      ],
      gender,
      birthdate: birthdate + 'T12:00:00.000+0000',
      birthdateEstimated
    };

    this.submitRequest(formPayload);
  };

  submitRequest(formPayload) {
    const { firstName, lastName } = this.state.person;
    this.setState({
      isRequestLoading: true
    });
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
          this.setState({
            ...this.state.submitForm,
            lastCreatedPerson: firstName + ' ' + lastName,
            isRequestLoading: false
          });
          this.handleClearForm();
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      })
      .then(response =>
        this.setState({
          showModal: true
        })
      )
      .catch(error =>
        this.setState(
          {
            isRequestError: true,
            showModal: true,
            isRequestLoading: false
          },
          () => console.error('Error:', error)
        )
      );
  }

  errorModalText = [
    'An error occurred while trying to register this person.',
    'Please try again.'
  ];

  sucessModalText = ['was added.'];

  render() {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const {
      isRequestError,
      isRequestLoading,
      showModal,
      lastCreatedPerson
    } = this.state;

    const isEnabled =
      firstName.length > 0 &&
      lastName.length > 0 &&
      gender.length > 0 &&
      birthdate.length > 0 &&
      !isRequestLoading;

    let modal = null;

    if (showModal) {
      if (isRequestError) {
        modal = (
          <ModalError onClose={this.hideModal} text={this.errorModalText} />
        );
      } else {
        modal = (
          <ModalSuccess
            onClose={this.hideModal}
            text={this.sucessModalText}
            lastCreatedPerson={lastCreatedPerson}
          />
        );
      }
    }

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
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
                    value={firstName}
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
                    onChange={this.handleChange}
                    value={middleName}
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
                    onChange={this.handleChange}
                    value={lastName}
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
                    onChange={this.handleChange}
                    value={birthdate}
                    id="birthdate"
                    max={moment().format('YYYY-MM-DD')}
                    required={true}
                  />
                  <Checkbox
                    title="Estimated"
                    name="birthdateEstimated"
                    checked={birthdateEstimated}
                    onChange={this.handleCheckbox}
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
                    onChange={this.fromAgetoDate}
                    value={moment.duration(moment().diff(birthdate)).years()}
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
                    onChange={this.fromAgetoDate}
                    value={moment.duration(moment().diff(birthdate)).months()}
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
                    onChange={this.fromAgetoDate}
                    value={moment.duration(moment().diff(birthdate)).days()}
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
                    onChange={this.handleChange}
                    options={genderOptions}
                    checkedOption={gender}
                    id="selectGender"
                    required={true}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <hr />
          <div className="submit-button">
            {isRequestLoading ? (
              <button>
                <div className="spinner" />
              </button>
            ) : (
              <input
                disabled={isEnabled ? null : 'disabled'}
                type="submit"
                value="Register"
              />
            )}
          </div>
          {modal}
        </form>
      </div>
    );
  }
}

export default FormContainer;
