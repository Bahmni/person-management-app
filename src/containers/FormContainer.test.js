import React from 'react';
import { shallow } from 'enzyme';
import FormContainer from './FormContainer';
import Input from '../components/Input';
import logo from './logo.png';
import SelectFromList from '../components/RadioButtonGroup';
import sinon from 'sinon';

describe('FormContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FormContainer />);
  });

  it('renders three <Input /> components', () => {
    expect(wrapper.find(Input).length).toEqual(4);
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
      firstNameInput = wrapper.find('Input').first();
      firstNameInput.simulate('change', {
        target: { value: exampleFirstName }
      });
    });

    it('should update the state property firstName', () => {
      expect(wrapper.state().firstName).toEqual(exampleFirstName);
    });

    it('requires First name input', () => {
      expect(firstNameInput.props().required).toBe(true);
    });

    it('clears the firstName value when the clear button is clicked', () => {
      wrapper.find('#clearButton').simulate('click', { preventDefault() {} });

      expect(firstNameInput.props().value).toEqual('');
    });

    describe('and then submits the form', () => {
      let submitRequest;
      beforeEach(() => {
        const form = wrapper.find('form');
        submitRequest = sinon.stub(FormContainer.prototype, 'submitRequest');
        wrapper.state.firstName = 'Max';
        form.simulate('submit', {
          preventDefault: () => {}
        });
      });
      it('should reset First Name to default value', () => {
        expect(wrapper.state().firstName).toEqual('');
        expect(
          submitRequest.calledWith({
            names: [
              {
                firstName: 'Max',
                familyName: ''
              }
            ],
            gender: '',
            age: 0
          })
        ).toBe(true);
      });
    }); // end of submit describe
  }); // end of firstName describe

  describe('the user selects value from gender options', () => {
    const exampleGenderSelected = 'Female';
    let selectGender;

    beforeEach(() => {
      selectGender = wrapper.find('#selectGender');
      selectGender.simulate('change', {
        target: { name: 'genderList', value: exampleGenderSelected }
      });
    });

    it('should update the state property gender', () => {
      expect(wrapper.state().gender).toEqual(exampleGenderSelected);
    });

    it('clears the gender value when the clear button is clicked', () => {
      wrapper.find('#clearButton').simulate('click', { preventDefault() {} });
      expect(wrapper.state('gender')).toBe('');
    });
  }); // end of gender options describe

  it('should change the Age input when the user types or clicks', () => {
    wrapper
      .find('#age')
      .simulate('change', { target: { name: 'age', value: '33' } });

    expect(wrapper.state('age')).toEqual('33');
  });
}); // end of outer describe
