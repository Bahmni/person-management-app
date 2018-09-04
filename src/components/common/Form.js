import { Component } from 'react';
import moment from 'moment';

class Form extends Component {
  state = {
    person: {},
    submitForm: {}
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
      submitForm: { ...this.state.submitForm, show: false }
    });
  };

  // calculating years, months, days from date input and back
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
        person: person
      };
    });
  };
}

export default Form;
