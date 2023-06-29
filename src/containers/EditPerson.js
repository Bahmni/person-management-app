import moment from 'moment';
import React, { Component } from 'react';
import {
  fetchPerson,
  getPersonAttributeTypeUuid,
  updatePerson
} from '../api/personApi';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import Dropdown from '../components/common/Dropdown';
import Input from '../components/common/Input';
import Navbar from '../components/common/Navbar';
import {
  emailPattern,
  genderOptions,
  personAttributes,
  phoneNumberPattern
} from '../components/common/constants';
import ModalError from '../components/common/modals/ModalError';
import ModalSuccess from '../components/common/modals/ModalSuccess';
import './EditPerson.css';

class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.match.params.uuid,
      person: {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        birthdate: moment(),
        birthdateEstimated: false,
        organization: '',
        email: '',
        mobilePhone: '',
        workPhone: '',
        residencePhone: '',
        otherPhone: '',
        occupation: ''
      },
      showModal: false,
      isAPIError: false,
      isRequestError: false,
      isRequestLoading: false,
      lastUpdatedPerson: '',
      attributes: {
        organizationUuid: '',
        emailUuid: '',
        mobilePhoneUuid: '',
        workPhoneUuid: '',
        residencePhoneUuid: '',
        otherPhoneUuid: '',
        occupationUuid: ''
      }
    };
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount() {
    this.setPersonAttributeIDs();
    this.loadPersonData();
  }

  setPersonAttributeIDs = async () => {
    this.setState({
      attributes: {
        organizationUuid: await getPersonAttributeTypeUuid(
          personAttributes.organization
        ),
        emailUuid: await getPersonAttributeTypeUuid(personAttributes.email),
        mobilePhoneUuid: await getPersonAttributeTypeUuid(
          personAttributes.mobilePhone
        ),
        workPhoneUuid: await getPersonAttributeTypeUuid(
          personAttributes.workPhone
        ),
        residencePhoneUuid: await getPersonAttributeTypeUuid(
          personAttributes.residencePhone
        ),
        otherPhoneUuid: await getPersonAttributeTypeUuid(
          personAttributes.otherPhone
        ),
        occupationUuid: await getPersonAttributeTypeUuid(
          personAttributes.occupation
        )
      }
    });
  };

  loadPersonData = async () => {
    fetchPerson(this.state.uuid)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            isRequestLoading: false
          });
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      })
      .then(data => {
        const { firstName, middleName, lastName } = this.getAllNames(
          data.display
        );
        const gender = this.getGender(data.gender);
        this.setState({
          person: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            gender: gender,
            birthdate: moment(data.birthdate).format('YYYY-MM-DD'),
            birthdateEstimated: data.birthdateEstimated
          }
        });
        data.attributes && this.setPersonAttributeValues(data.attributes);
      });
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

  setPersonAttributeValues = attributes => {
    attributes.forEach(attribute => {
      switch (attribute.display.split(' = ')[0]) {
        case personAttributes.organization: {
          this.setState({
            person: {
              ...this.state.person,
              organization: attribute.display.split(' = ')[1]
            }
          });
          break;
        }
        case personAttributes.email: {
          this.setState({
            person: {
              ...this.state.person,
              email: attribute.display.split(' = ')[1]
            }
          });
          break;
        }
        case personAttributes.mobilePhone: {
          this.setState({
            person: {
              ...this.state.person,
              mobilePhone: attribute.display.split(' = ')[1]
            }
          });
          break;
        }
        case personAttributes.workPhone: {
          this.setState({
            person: {
              ...this.state.person,
              workPhone: attribute.display.split(' = ')[1]
            }
          });
          break;
        }
        case personAttributes.residencePhone: {
          this.setState({
            person: {
              ...this.state.person,
              residencePhone: attribute.display.split(' = ')[1]
            }
          });
          break;
        }
        case personAttributes.otherPhone: {
          this.setState({
            person: {
              ...this.state.person,
              otherPhone: attribute.display.split(' = ')[1]
            }
          });
          break;
        }
        case personAttributes.occupation: {
          this.setState({
            person: {
              ...this.state.person,
              occupation: attribute.display.split(' = ')[1]
            }
          });
          break;
        }
        default:
          break;
      }
    });
  };

  getAllNames = name => {
    const nameArray = name.split(' ');
    const firstName = nameArray[0];
    if (nameArray.length === 2) {
      const lastName = nameArray[1];
      return { firstName, lastName };
    } else if (nameArray.length === 3) {
      const middleName = nameArray[1];
      const lastName = nameArray[2];
      return { firstName, middleName, lastName };
    }
  };

  handleChange = ({ target: input }) => {
    const person = { ...this.state.person };
    person[input.name] = input.value;
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
        organization: '',
        email: '',
        mobilePhone: '',
        workPhone: '',
        residencePhone: '',
        otherPhone: '',
        occupation: ''
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
      middleName,
      lastName,
      gender,
      organization,
      email,
      mobilePhone,
      workPhone,
      residencePhone,
      otherPhone,
      occupation,
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const formPayload = {
      names: [
        {
          familyName: lastName,
          givenName: firstName,
          middleName: middleName
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
            uuid: this.state.attributes.mobilePhoneUuid
          },
          voided: this.isVoided(mobilePhone),
          value: mobilePhone
        },
        {
          attributeType: {
            uuid: this.state.attributes.workPhoneUuid
          },
          voided: this.isVoided(workPhone),
          value: workPhone
        },
        {
          attributeType: {
            uuid: this.state.attributes.residencePhoneUuid
          },
          voided: this.isVoided(residencePhone),
          value: residencePhone
        },
        {
          attributeType: {
            uuid: this.state.attributes.otherPhoneUuid
          },
          voided: this.isVoided(otherPhone),
          value: otherPhone
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
    if (this.isVoided(birthdate)) {
      formPayload.birthdate = birthdate + 'T12:00:00.000+0000';
    }
    this.isVoided(organization) && delete formPayload.attributes[0].value;
    this.isVoided(email) && delete formPayload.attributes[1].value;
    this.isVoided(mobilePhone) && delete formPayload.attributes[2].value;
    this.isVoided(workPhone) && delete formPayload.attributes[3].value;
    this.isVoided(residencePhone) && delete formPayload.attributes[4].value;
    this.isVoided(otherPhone) && delete formPayload.attributes[5].value;
    this.isVoided(occupation) && delete formPayload.attributes[6].value;
    return formPayload;
  };

  handlePersonUpdate = e => {
    e.preventDefault();
    const payload = this.createFormPayload();
    this.updateRequest(payload);
  };

  updateRequest(formPayload) {
    const { firstName, lastName } = this.state.person;
    this.setState({
      isRequestLoading: true
    });
    updatePerson(this.state.uuid, formPayload)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            ...this.state.submitForm,
            lastUpdatedPerson: firstName + ' ' + lastName,
            isRequestLoading: false
          });
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
        this.handleClearForm();
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

  successModalText = ['was updated.'];

  render() {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      organization,
      email,
      mobilePhone,
      workPhone,
      residencePhone,
      otherPhone,
      occupation,
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const {
      isRequestError,
      isRequestLoading,
      showModal,
      lastUpdatedPerson: lastCreatedPerson
    } = this.state;

    const isEnabled = !isRequestLoading;

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
        <Navbar title="Edit Person" searchPage={false} />
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
                    value={firstName}
                    id="firstName"
                    required={true}
                    disabled={true}
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'text'}
                    title={'Middle name '}
                    name={'middleName'}
                    aria-label={'Middle name'}
                    value={middleName}
                    id="middleName"
                    disabled={true}
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'text'}
                    title={'Last name '}
                    name={'lastName'}
                    aria-label={'Last name'}
                    aria-required="true"
                    value={lastName}
                    id="lastName"
                    required={true}
                    disabled={true}
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
                    value={birthdate}
                    id="birthdate"
                    max={moment().format('YYYY-MM-DD')}
                    required={true}
                    disabled={true}
                  />
                  <Checkbox
                    title="Estimated"
                    name="birthdateEstimated"
                    checked={birthdateEstimated}
                    id="estimatedDate"
                    disabled={true}
                  />
                </div>
                <div className="flex-item2">
                  <Input
                    type={'number'}
                    title={'Years '}
                    name={'year'}
                    aria-label={'Years'}
                    aria-required="true"
                    value={moment.duration(moment().diff(birthdate)).years()}
                    id="age"
                    min={0}
                    max={120}
                    disabled={true}
                  />
                  <Input
                    type={'number'}
                    title={'Months '}
                    name={'month'}
                    aria-label={'Months'}
                    aria-required="true"
                    value={moment.duration(moment().diff(birthdate)).months()}
                    id="months"
                    min={0}
                    max={12}
                    disabled={true}
                  />
                  <Input
                    type={'number'}
                    title={'Days '}
                    name={'day'}
                    aria-label={'Days'}
                    aria-required="true"
                    value={moment.duration(moment().diff(birthdate)).days()}
                    id="days"
                    min={0}
                    max={31}
                    disabled={true}
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
                    required={true}
                    disabled={true}
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
                    type={'email'}
                    title={'Email '}
                    name={'email'}
                    aria-label={'Email'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={email}
                    id="email"
                    pattern={emailPattern}
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'tel'}
                    title={'Mobile Phone '}
                    name={'mobilePhone'}
                    aria-label={'Mobile Phone'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={mobilePhone}
                    id="mobilePhone"
                    pattern={phoneNumberPattern}
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'tel'}
                    title={'Work Phone '}
                    name={'workPhone'}
                    aria-label={'Work Phone'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={workPhone}
                    id="workPhone"
                    pattern={phoneNumberPattern}
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'tel'}
                    title={'Residence Phone '}
                    name={'residencePhone'}
                    aria-label={'Residence Phone'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={residencePhone}
                    id="residencePhone"
                    pattern={phoneNumberPattern}
                  />
                </div>
                <div className="flex-item">
                  <Input
                    type={'tel'}
                    title={'Other Phone '}
                    name={'otherPhone'}
                    aria-label={'Other Phone'}
                    aria-required="true"
                    onChange={this.handleChange}
                    value={otherPhone}
                    id="otherPhone"
                    pattern={phoneNumberPattern}
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
                value="Update"
                valueLoading=""
                isLoading={isRequestLoading}
                onClick={this.handlePersonUpdate}
              />
            </div>
          </div>
          {modal}
        </form>
      </div>
    );
  }
}

export default EditPerson;
