import React from 'react';
import { shallow, render as mount } from 'enzyme';
import EditPerson from './EditPerson';
import Input from '../components/common/Input';
import SelectFromList from '../components/common/Dropdown';
import { BrowserRouter } from 'react-router-dom';

describe('EditPerson', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditPerson />);
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
}); // end of outer describe
