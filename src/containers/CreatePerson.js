import moment from 'moment';
import React, { Component } from 'react';
import {
  getPersonAttributeTypeUuid,
  savePerson,
  fetchPersonAttributeConfig
} from '../api/personApi';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import Dropdown from '../components/common/Dropdown';
import Input from '../components/common/Input';
import Navbar from '../components/common/Navbar';
import { genderOptions } from '../components/common/constants';
import ModalError from '../components/common/modals/ModalError';
import ModalSuccess from '../components/common/modals/ModalSuccess';
import './CreatePerson.css';

class CreatePerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        birthdate: moment(),
        age: {
          years: 0,
          months: 0,
          days: 0
        },
        birthdateEstimated: false
      },
      showModal: false,
      isAPIError: false,
      isRequestError: false,
      isRequestLoading: false,
      lastCreatedPerson: '',
      attributes: []
    };
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount() {
    this.getAttributes().then(response => {
      const attributes = response.config.personAttributesForRelations.map(
        async attribute => {
          const uuid = await getPersonAttributeTypeUuid(
            attribute.attributeName
          );
          return {
            ...attribute,
            value: '',
            uuid: uuid
          };
        }
      );

      Promise.all(attributes).then(resolvedAttributes => {
        this.setState({
          attributes: resolvedAttributes
        });
      });
    });
  }

  getAttributes = async () => {
    const response = await fetchPersonAttributeConfig();
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }
  };

  handleChange = ({ target: input }) => {
    const person = { ...this.state.person };
    if (input.name === 'birthdate') {
      var birthdate = input.value;
      const today = moment();
      person.age.years = moment.duration(today.diff(birthdate)).years();
      person.age.months = moment.duration(today.diff(birthdate)).months();
      person.age.days = moment.duration(today.diff(birthdate)).days();
      person.birthdate = birthdate;
    } else if (
      input.name === 'years' ||
      input.name === 'months' ||
      input.name === 'days'
    ) {
      person.age[input.name] = input.value;
      const now = moment();
      const currentDOB = moment()
        .year(now.year() - person.age.years)
        .month(now.month() - person.age.months)
        .date(now.date() - person.age.days);
      person.birthdate = currentDOB.format('YYYY-MM-DD');
    } else {
      person[input.name] = input.value;
    }
    this.setState({ person });
  };

  handleOtherAttributesChange = ({ target: input }) => {
    const attributes = [...this.state.attributes];
    const index = attributes.findIndex(
      attribute => attribute.name === input.name
    );
    attributes[index].value = input.value;
    this.setState({ attributes });
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

  handleClearForm() {
    this.setState({
      person: {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        birthdate: moment(),
        age: {
          years: 0,
          months: 0,
          days: 0
        },
        birthdateEstimated: false
      },
      isRequestError: false
    });
    this.state.attributes.map(attribute => {
      attribute.value = '';
      return attribute;
    });
  }

  isVoided = value => {
    return value === '' ? true : false;
  };

  getGender = gender => {
    switch (gender) {
      case 'Male':
        return 'M';
      case 'Female':
        return 'F';
      case 'Other':
        return 'O';
      default:
        return gender;
    }
  };

  createFormPayload = () => {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const attributes = this.state.attributes.map(attribute => {
      return {
        attributeType: {
          uuid: attribute.uuid
        },
        voided: this.isVoided(attribute.value),
        value: attribute.value
      };
    });

    const formPayload = {
      names: [
        {
          familyName: lastName,
          givenName: firstName,
          middleName: middleName
        }
      ],
      gender,
      birthdate: birthdate + 'T12:00:00.000+0000',
      age: moment.duration(moment().diff(birthdate)).years(),
      birthdateEstimated,
      attributes: attributes
    };
    return formPayload;
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const payload = this.createFormPayload();
    this.submitRequest(payload);
  };

  submitRequest(formPayload) {
    const { firstName, lastName } = this.state.person;
    formPayload.gender = this.getGender(formPayload.gender);
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
      .then(response => {
        this.setState({
          showModal: true
        });
        this.sendPersonToIframe(response);
      })
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

  sendPersonToIframe = async response => {
    var iframe = window.frameElement;
    if (iframe) {
      const delay = 4000;
      await new Promise(resolve => setTimeout(resolve, delay));
      window.parent.postMessage(response, '*');
    }
  };

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
      birthdate,
      birthdateEstimated
    } = this.state.person;
    const personAttributes = this.state.attributes;

    const { years, months, days } = this.state.person.age;

    const {
      isRequestError,
      isRequestLoading,
      showModal,
      lastCreatedPerson
    } = this.state;

    const isEnabled =
      firstName.length > 0 &&
      lastName.length > 0 &&
      gender !== '' &&
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
            text={this.successModalText}
            lastCreatedPerson={lastCreatedPerson}
          />
        );
      }
    }

    return (
      <div>
        <Navbar title="Register New Person" searchPage={false} />
        <form autoComplete="off">
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
                    name={'years'}
                    aria-label={'Years'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={years}
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
                    onChange={this.handleChange}
                    value={months}
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
                    onChange={this.handleChange}
                    value={days}
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
              <div className="flex-container-row">
                <div className="flex-item">
                  <Dropdown
                    name={'gender'}
                    title={'Gender'}
                    value={gender}
                    items={genderOptions}
                    onChange={this.handleChange}
                    required={true}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          {personAttributes.length > 0 && (
            <div>
              <hr />
              <div>
                <fieldset className="other-attributes">
                  <legend>Other Information</legend>
                  {personAttributes.map(attribute => {
                    return (
                      <div className="flex-container-row" key={attribute.name}>
                        <div className="flex-item">
                          <Input
                            type={'text'}
                            title={attribute.text}
                            name={attribute.name}
                            aria-label={attribute.text}
                            aria-required="true"
                            onChange={this.handleOtherAttributesChange}
                            value={attribute.value}
                            id={attribute.name}
                          />
                        </div>
                      </div>
                    );
                  })}
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
            </div>
          )}
          {modal}
        </form>
      </div>
    );
  }
}

export default CreatePerson;
