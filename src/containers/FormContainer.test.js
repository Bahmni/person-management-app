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

  it('renders "Signup" with logo', () => {
    const signup = (
      <h5>
        <img src={logo} alt="logo" /> Sign Up Form
      </h5>
    );
    expect(wrapper.contains(signup)).toEqual(true);
  });

  it('renders three <Input /> components', () => {
    expect(wrapper.find(Input).length).toEqual(3);
  });

  it('renders one <SelectFromList /> component', () => {
    expect(wrapper.find(SelectFromList).length).toEqual(1);
  });

  it('renders givenName input', () => {
    expect(wrapper.find('#givenName').length).toEqual(1);
  });

  describe('the user populates given name input', () => {
    const exampleGivenName = 'Max';
    let givenNameInput;

    beforeEach(() => {
      givenNameInput = wrapper.find('Input').first();
      givenNameInput.simulate('change', {
        target: { value: exampleGivenName }
      });
    });

    it('should update the state property givenName', () => {
      expect(wrapper.state().givenName).toEqual(exampleGivenName);
    });

    it('requires Given name input', () => {
      expect(givenNameInput.props().required).toBe(true);
    });

    it('clears the givenName value when the clear button is clicked', () => {
      wrapper.find('#clearButton').simulate('click', { preventDefault() {} });

      expect(givenNameInput.props().value).toEqual('');
    });

    describe('and then submits the form', () => {
      let submitRequest;
      beforeEach(() => {
        const form = wrapper.find('form');
        submitRequest = sinon.stub(FormContainer.prototype, 'submitRequest');
        wrapper.state.givenName = 'Max';
        form.simulate('submit', {
          preventDefault: () => {}
        });
      });
      it('should reset Given Name to default value', () => {
        expect(wrapper.state().givenName).toEqual('');
        expect(
          submitRequest.calledWith({
            names: [
              {
                givenName: 'Max',
                familyName: ''
              }
            ],
            gender: '',
            age: 0
          })
        ).toBe(true);
      });
    }); // end of submit describe
  }); // end of givenName describe

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
