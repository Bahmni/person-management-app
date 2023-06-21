import React from 'react';
import { shallow, render as mount } from 'enzyme';
import EditPerson from './EditPerson';
import Input from '../components/common/Input';
import SelectFromList from '../components/common/Dropdown';

describe('EditPerson', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <EditPerson
        match={{ params: { uuid: '819ba69e-6c13-4803-8a14-d7abfac66e99' } }}
      />
    );
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

  it('Checks if firstName input is disabled', () => {
    expect(wrapper.find('#firstName').prop('disabled')).toBe(true);
  });

  it('renders lastName input', () => {
    expect(wrapper.find('#lastName').length).toEqual(1);
  });

  it('Checks if lastName input is disabled', () => {
    expect(wrapper.find('#lastName').prop('disabled')).toBe(true);
  });

  it('renders email input', () => {
    expect(wrapper.find('#email').length).toEqual(1);
  });

  describe('the user populates email input', () => {
    const exampleEmail = 'Max@gmail.com';
    let firstNameInput;

    beforeEach(() => {
      firstNameInput = wrapper.find('#email');
      firstNameInput.simulate('change', {
        target: { value: exampleEmail, name: 'email' }
      });
    });

    it('should update the state property email', () => {
      expect(wrapper.state().person.email).toEqual(exampleEmail);
    });
  });
}); // end of outer describe
