import React from 'react';
import { shallow } from 'enzyme';
import CreatePerson from './CreatePerson';
import Input from '../components/common/Input';
import SelectFromList from '../components/common/Dropdown';
import moment from 'moment';

describe('CreatePerson', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreatePerson />);
  });

  it('renders fourteen <Input /> components', () => {
    expect(wrapper.find(Input).length).toEqual(14);
  });

  it('renders one <SelectFromList /> component', () => {
    expect(wrapper.find(SelectFromList).length).toEqual(1);
  });

  it('renders firstName input', () => {
    expect(wrapper.find('#firstName').length).toEqual(1);
  });

  describe('the user populates first name input', () => {
    const exampleFirstName = 'Max';
    let firstNameInput;

    beforeEach(() => {
      firstNameInput = wrapper.find('#firstName');
      firstNameInput.simulate('change', {
        target: { value: exampleFirstName, name: 'firstName' }
      });
    });

    it('should update the state property firstName', () => {
      expect(wrapper.state().person.firstName).toEqual(exampleFirstName);
    });

    it('requires First name input', () => {
      expect(firstNameInput.props().required).toBe(true);
    });
  }); // end of firstName describe

  describe('the user selects value from gender options', () => {
    const exampleGenderSelected = 'Female';
    let selectGender;

    beforeEach(() => {
      selectGender = wrapper.find('#lastName');
      selectGender.simulate('change', {
        target: { name: 'gender', value: exampleGenderSelected }
      });
    });

    it('should update the state property gender', () => {
      expect(wrapper.state().person.gender).toEqual(exampleGenderSelected);
    });
  }); // end of gender options describe

  describe('the user populates birthdate', () => {
    const exampleDOB = '2019-07-01';
    let dobInput;

    beforeEach(() => {
      dobInput = wrapper.find('#birthdate');
      dobInput.simulate('change', {
        target: { value: exampleDOB, name: 'birthdate' }
      });
    });

    it('should update the state property birthdate', () => {
      expect(wrapper.state().person.birthdate).toEqual(exampleDOB);
    });

    it('requires birthdate input', () => {
      expect(dobInput.props().required).toBe(true);
    });

    it('should update the state property age', () => {
      const age = { years: 0, months: 0, days: 0 };
      const today = moment();
      age.years = moment.duration(today.diff(exampleDOB)).years();
      age.months = moment.duration(today.diff(exampleDOB)).months();
      age.days = moment.duration(today.diff(exampleDOB)).days();
      expect(wrapper.state().person.age.years).toEqual(age.years);
      expect(wrapper.state().person.age.months).toEqual(age.months);
      expect(wrapper.state().person.age.days).toEqual(age.days);
    });
  }); // end of birthdate describe

  describe('the user populates age (year, month and day)', () => {
    const exampleYears = 4;
    const exampleMonths = 1;
    const exampleDays = 2;
    let yearsInput, monthsInput, daysInput;
    beforeEach(() => {
      yearsInput = wrapper.find('#age');
      monthsInput = wrapper.find('#months');
      daysInput = wrapper.find('#days');
      yearsInput.simulate('change', {
        target: { value: exampleYears, name: 'years' }
      });
      monthsInput.simulate('change', {
        target: { value: exampleMonths, name: 'months' }
      });
      daysInput.simulate('change', {
        target: { value: exampleDays, name: 'days' }
      });
    });

    it('should update the state property years, months and days', () => {
      expect(wrapper.state().person.age.years).toEqual(exampleYears);
      expect(wrapper.state().person.age.months).toEqual(exampleMonths);
      expect(wrapper.state().person.age.days).toEqual(exampleDays);
    });

    it('should update the state property age', () => {
      const now = moment();
      const dob = moment()
        .year(now.year() - exampleYears)
        .month(now.month() - exampleMonths)
        .date(now.date() - exampleDays);
      expect(wrapper.state().person.birthdate).toEqual(
        dob.format('YYYY-MM-DD')
      );
    });
  }); // end of birthdate describe
}); // end of outer describe
