import moment from 'moment';
import React, { Component } from 'react';
import {
  fetchPerson,
  getPersonAttributeTypeUuid,
  updatePerson,
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
        birthdateEstimated: false
      },
      showModal: false,
      isAPIError: false,
      isRequestError: false,
      isRequestLoading: false,
      lastUpdatedPerson: '',
      attributes: [],
      attributesData: []
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

      Promise.all(attributes)
        .then(resolvedAttributes => {
          this.setState({
            attributes: resolvedAttributes
          });
        })
        .then(() => {
          this.loadPersonData();
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
        if (data.attributes != []) {
          this.setState({ attributesData: data.attributes });
          this.setPersonAttributeValues(data.attributes);
        }
      });
  };

  getGender = gender => {
    switch (gender) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
      case 'O':
        return 'Other';
      default:
        return gender;
    }
  };

  setPersonAttributeValues = attributes => {
    attributes.forEach(attribute => {
      const attributeName = attribute.display.split(' = ')[0];
      const attributeValue = attribute.display.split(' = ')[1];
      this.setState(prevState => ({
        attributes: prevState.attributes.map(stateAttribute => {
          if (stateAttribute.attributeName === attributeName) {
            return { ...stateAttribute, value: attributeValue };
          }
          return stateAttribute;
        })
      }));
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
    this.setPersonAttributeValues(this.state.attributesData);
    this.setState({
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
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const attributes = this.state.attributes.map(attribute => {
      return {
        attributeType: {
          uuid: attribute.uuid
        },
        voided: this.isVoided(attribute.value),
        value: !this.isVoided(attribute.value) ? attribute.value : null
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
      birthdateEstimated,
      attributes: attributes
    };
    if (this.isVoided(birthdate)) {
      formPayload.birthdate = birthdate + 'T12:00:00.000+0000';
    }
    return formPayload;
  };

  handlePersonUpdate = e => {
    e.preventDefault();
    const payload = this.createFormPayload();
    this.updateRequest(payload);
  };

  handleOtherAttributesChange = ({ target: input }) => {
    const attributes = [...this.state.attributes];
    const index = attributes.findIndex(
      attribute => attribute.name === input.name
    );
    attributes[index].value = input.value;
    this.setState({ attributes });
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
      birthdate,
      birthdateEstimated
    } = this.state.person;

    const {
      isRequestError,
      isRequestLoading,
      showModal,
      lastUpdatedPerson: lastCreatedPerson
    } = this.state;

    const personAttributes = this.state.attributes;

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
                    value="Update"
                    valueLoading=""
                    isLoading={isRequestLoading}
                    onClick={this.handlePersonUpdate}
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

export default EditPerson;
