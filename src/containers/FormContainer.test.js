import React from 'react';
import { shallow } from 'enzyme';
import FormContainer from './FormContainer';
import Input from '../components/common/Input';
import SelectFromList from '../components/common/RadioButtonGroup';

describe('FormContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FormContainer />);
  });

  it('renders eleven <Input /> components', () => {
    expect(wrapper.find(Input).length).toEqual(11);
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
      selectGender = wrapper.find('#selectGender');
      selectGender.simulate('change', {
        target: { name: 'gender', value: exampleGenderSelected }
      });
    });

    it('should update the state property gender', () => {
      expect(wrapper.state().person.gender).toEqual(exampleGenderSelected);
    });
  }); // end of gender options describe
}); // end of outer describe
