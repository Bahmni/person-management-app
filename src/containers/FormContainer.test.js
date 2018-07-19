import React from 'react';
import { shallow } from 'enzyme';
import FormContainer from './FormContainer';
import Input from '../components/Input';
import logo from './logo.png';
import SelectFromList from '../components/SelectFromList';

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

  it('requires Given Name input', () => {
    expect(wrapper.find('#givenName').is('[required]')).toBe(true);
  });

  it('requires Given Name input - alternative way of testing', () => {
    const givenName = wrapper.find('#givenName');
    expect(givenName.props().required).toBe(true);
  });

  it('should change the Family Name input when the user types', () => {
    wrapper
      .find('#familyName')
      .simulate('change', { target: { name: 'familyName', value: 'Stevens' } });
    expect(wrapper.state('familyName')).toEqual('Stevens');
  });

  it('should change the Age input when the user types or clicks', () => {
    wrapper
      .find('#age')
      .simulate('change', { target: { name: 'age', value: '33' } });
    expect(wrapper.state('age')).toEqual('33');
  });
  it('when simulating a change, select should update its value', () => {
    wrapper
      .find('#select')
      .simulate('change', { target: { name: 'genderList', value: 'Male' } });
    expect(wrapper.state('gender')).toBe('Male');
  });
});

// not working
// it('clears all the form values after clear button is clicked', () => {
//   const wrapper = shallow(<FormContainer />);
//   wrapper
//     .find('#age')
//     .simulate('change', { target: { name: 'age', value:31} });
//   wrapper.find('#clearButton').simulate('click')
//   expect(wrapper.state('age')).toBe(0);
// });
