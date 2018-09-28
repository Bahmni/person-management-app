import React, { Component } from 'react';
import Navbar from '../components/common/Navbar';
import ModalError from '../components/common/modals/ModalError';
import Input from '../components/common/Input';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import './PersonDashboard.css';

class PersonDashboard extends Component {
  state = {
    person: {
      name: ''
    },
    data: [],
    isRequestLoading: false,
    isRequestError: false,
    isRequestMade: false,
    showModal: false
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleChange = ({ target: input }) => {
    const person = { ...this.state.person };
    person[input.name] = input.value;
    this.setState({ person });
  };

  handleSearch() {
    this.setState({
      isRequestLoading: true
    });
    const url = process.env.REACT_APP_URL;
    const searchPerson = this.state.person.name;
    const q = '?q=' + searchPerson;
    const fullUrl = url + q;
    const customData =
      '&v=custom%3Auuid%2Cdisplay%2Cage%2Cgender%2CdateCreated';
    const fullUrlCustom = fullUrl + customData;

    fetch(fullUrlCustom, {
      method: 'GET',
      credentials: 'include'
    })
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
        this.setState({ data: data.results, isRequestMade: true });
      })

      .catch(error =>
        this.setState(
          {
            isRequestLoading: false,
            isRequestError: true,
            showModal: true
          },
          () => console.error('Error:', error)
        )
      );
  }

  hideModal = () => {
    this.setState({
      showModal: false
    });
  };

  errorModalText = ["We're having technical problems.", 'Please try again.'];

  render() {
    const {
      person,
      isRequestMade,
      isRequestLoading,
      isRequestError,
      showModal,
      data
    } = this.state;
    const isEnabled = person.name.length > 0 && !isRequestLoading;

    let modal = null;
    if (isRequestError && showModal) {
      modal = (
        <ModalError onClose={this.hideModal} text={this.errorModalText} />
      );
    }

    return (
      <div onKeyPress={this.handleKeyPress}>
        <Navbar title=" " searchPage={true} />
        <div className="searchForm">
          <legend>Search</legend>
          <div className="formGroup">
            <div className="flex-container-row">
              <div className="search-item">
                <span className="padding" />
                <Input
                  type={'text'}
                  title={'Name '}
                  name={'name'}
                  aria-label={'Name'}
                  aria-required="true"
                  onChange={this.handleChange}
                  value={this.state.name}
                  id="name"
                  required={true}
                />
              </div>
              <div className="search-button">
                <Button
                  disabled={isEnabled ? null : 'disabled'}
                  value="Search"
                  valueLoading="Searching"
                  isLoading={isRequestLoading}
                  onClick={e => this.handleSearch(e)}
                  data="M47.2,43.8L34.3,30.9c2.5-3.2,4-7.3,4-11.7c0-10.6-8.6-19.1-19.1-19.1C8.7,0.1,0.1,8.7,0.1,19.2 c0,10.6,8.6,19.1,19.1,19.1c4.4,0,8.5-1.5,11.7-4l12.9,12.9c0.5,0.5,1.1,0.7,1.7,0.7s1.2-0.2,1.7-0.7C48.2,46.3,48.2,44.8,47.2,43.8 z M4.9,19.2c0-7.9,6.4-14.3,14.3-14.3s14.3,6.4,14.3,14.3c0,7.9-6.4,14.3-14.3,14.3S4.9,27.1,4.9,19.2z"
                />
              </div>
            </div>
            {data.length !== 0 ? (
              <p className="numResults">
                <strong>{data.length}</strong> Person(s) found
              </p>
            ) : isRequestMade ? (
              <p className="numResults">No results found</p>
            ) : null}
          </div>
        </div>
        <div className="tableContainer">
          {data.length !== 0 ? <Table data={data} /> : null}
        </div>
        {modal}
      </div>
    );
  }
}

export default PersonDashboard;
