import moment from 'moment';
import React, { Component } from 'react';
import { getPersonAttributeTypeUuid, savePerson } from '../api/personApi';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import Dropdown from '../components/common/Dropdown';
import Input from '../components/common/Input';
import Navbar from '../components/common/Navbar';
import { genderOptions, phoneOptions } from '../components/common/constants';
import ModalError from '../components/common/modals/ModalError';
import ModalSuccess from '../components/common/modals/ModalSuccess';
import './FormContainer.css';

class FormContainer extends Component {
  state = {
    person: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthdate: '',
      birthdateEstimated: false,
      organization: '',
      email: '',
      phoneNumber: '',
      phoneType: '',
      occupation: ''
    },
    showModal: false,
    isRequestError: false,
    isRequestLoading: false,
    lastCreatedPerson: '',
    attributes: {
      organizationUuid: '',
      emailUuid: '',
      phoneNumberUuid: '',
      phoneTypeUuid: '',
      occupationUuid: ''
    }
  };

  componentDidMount() {
    this.getPersonAttributes();
  }

  getPersonAttributes = async () => {
    this.setState({
      attributes: {
        organizationUuid: await getPersonAttributeTypeUuid('organization'),
        emailUuid: await getPersonAttributeTypeUuid('email'),
        phoneNumberUuid: await getPersonAttributeTypeUuid('mobilePhone'),
        phoneTypeUuid: await getPersonAttributeTypeUuid('phoneType'),
        occupationUuid: await getPersonAttributeTypeUuid('occupation')
      }
    });
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
        organization: '',
        email: '',
        phoneNumber: '',
        phoneType: '',
        occupation: '',
        gender: '',
        birthdate: '',
        birthdateEstimated: false
      },
      isRequestError: false
    });
  }

  isVoided = value => {
    return value === '' ? true : false;
  };

  createFormPayload = () => {
    const {
      firstName,
      lastName,
      gender,
      organization,
      email,
      phoneNumber,
      phoneType,
      occupation,
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
      birthdateEstimated,
      attributes: [
        {
          attributeType: {
            uuid: this.state.attributes.organizationUuid
          },
          voided: this.isVoided(organization),
          value: organization
        },
        {
          attributeType: {
            uuid: this.state.attributes.emailUuid
          },
          voided: this.isVoided(email),
          value: email
        },
        {
          attributeType: {
            uuid: this.state.attributes.phoneNumberUuid
          },
          voided: this.isVoided(phoneNumber),
          value: phoneNumber
        },
        {
          attributeType: {
            uuid: this.state.attributes.phoneTypeUuid
          },
          voided: this.isVoided(phoneType),
          value: phoneType
        },
        {
          attributeType: {
            uuid: this.state.attributes.occupationUuid
          },
          voided: this.isVoided(occupation),
          value: occupation
        }
      ]
    };
    !this.isVoided(birthdate)
      ? (formPayload.birthdate = birthdate + 'T12:00:00.000+0000')
      : null;
    return formPayload;
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const payload = this.createFormPayload();
    this.submitRequest(payload);
  };

  submitRequest(formPayload) {
    const { firstName, lastName } = this.state.person;
    this.setState({
      isRequestLoading: true
    });
    savePerson(formPayload)
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
      .then(() =>
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

  successModalText = ['was added.'];

  render() {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      organization,
      email,
      phoneNumber,
      phoneType,
      occupation,
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const {
      isRequestError,
      isRequestLoading,
      showModal,
      lastCreatedPerson
    } = this.state;

    const isEnabled = firstName.length > 0 && !isRequestLoading;

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
            text={this.successModalText}
            lastCreatedPerson={lastCreatedPerson}
          />
        );
      }
    }

    return (
      <div>
        <Navbar title="Register New Person" searchPage={false} />
        <form>
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
              <legend>Gender</legend>
              <div className="flex-container-row">
                <div className="flex-item">
                  <Dropdown
                    name={'gender'}
                    title={''}
                    value={gender}
                    items={genderOptions}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <hr />
          <div>
            <fieldset>
              <legend>Other Information</legend>
              <div className="flex-container-row">
                <div className="flex-item">
                  <Input
                    type={'text'}
                    title={'Organization '}
                    name={'organization'}
                    aria-label={'Organization'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={organization}
                    id="organization"
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'text'}
                    title={'Email '}
                    name={'email'}
                    aria-label={'Email'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={email}
                    id="email"
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'text'}
                    title={'Phone Number '}
                    name={'phoneNumber'}
                    aria-label={'Phone Number'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={phoneNumber}
                    id="phoneNumber"
                  />
                </div>
                <div className="flex-item">
                  <Dropdown
                    name="phoneType"
                    title={'Phone Type '}
                    value={phoneType}
                    items={phoneOptions}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'text'}
                    title={'Occupation '}
                    name={'occupation'}
                    aria-label={'Occupation'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={occupation}
                    id="occupation"
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <hr />
          <div className="flex-container-row">
            <div className="flex-item">
              <Button
                value="Cancel"
                valueLoading=""
                isLoading={false}
                onClick={this.handleClearForm}
              />
            </div>
            <div className="flex-item">
              <Button
                disabled={isEnabled ? null : 'disabled'}
                value="Register"
                valueLoading=""
                isLoading={isRequestLoading}
                onClick={this.handleFormSubmit}
              />
            </div>
          </div>
          {modal}
        </form>
      </div>
    );
  }
}

export default FormContainer;
