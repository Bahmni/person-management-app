import React, { Component } from 'react';
import Input from '../components/common/Input';

class PersonDashboard extends Component {
  state = {
    person: {
      firstName: '',
      lastName: ''
    }
  };

  render() {
    return (
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
              value={this.props.firstName}
              id="firstName"
              required={true}
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
              value={this.props.lastName}
              id="lastName"
              required={true}
            />
          </div>
        </div>
      </fieldset>
    );
  }
}

export default PersonDashboard;
