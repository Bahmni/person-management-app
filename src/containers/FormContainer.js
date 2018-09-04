import React from 'react';
import Form from '../components/common/Form';
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
class FormContainer extends Form {
  state = {
    person: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthdate: moment(),
      birthdateEstimated: false
    },
    submitForm: {
      show: false,
      isError: false,
      isLoading: false,
      lastCreatedPerson: ''
    }
  };

  handleBirthdateEstimated = ({ target: input }) => {
    const person = { ...this.state.person };
    person[input.name] = input.checked;
    this.setState({ person });
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
      submitForm: {
        ...this.state.submitForm,
        isError: false
      }
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
      gender: gender,
      birthdate: birthdate + 'T12:00:00.000+0000',
      birthdateEstimated: birthdateEstimated
    };

    this.submitRequest(formPayload);
  };

  submitRequest(formPayload) {
    this.setState({
      submitForm: { ...this.state.submitForm, isLoading: true }
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
            submitForm: {
              ...this.state.submitForm,
              lastCreatedPerson:
                this.state.person.firstName + ' ' + this.state.person.lastName,
              isLoading: false
            }
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
        this.setState({ submitForm: { ...this.state.submitForm, show: true } })
      )
      .catch(error =>
        this.setState(
          {
            submitForm: {
              ...this.state.submitForm,
              isError: true,
              show: true,
              isLoading: false
            }
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
      isError,
      isLoading,
      show,
      lastCreatedPerson
    } = this.state.submitForm;

    let modal = null;

    const isEnabled =
      firstName.length > 0 &&
      lastName.length > 0 &&
      gender.length > 0 &&
      birthdate.length > 0 &&
      !isLoading;

    if (show) {
      if (isError) {
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
                    onChange={this.handleBirthdateEstimated}
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
            {isLoading ? (
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
