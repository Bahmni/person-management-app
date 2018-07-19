import React from 'react';
import { shallow } from 'enzyme';
import FormContainer from './FormContainer';
import Input from '../components/Input';
import logo from './logo.png';
import SelectFromList from '../components/SelectFromList';

it('renders without crashing', () => {
  shallow(<FormContainer />);
});

it('renders "Signup" with logo', () => {
  const wrapper = shallow(<FormContainer />);
  const signup = (
    <h5>
      <img src={logo} alt="logo" /> Sign Up Form
    </h5>
  );
  expect(wrapper.contains(signup)).toEqual(true);
});

it('renders three <Input /> components', () => {
  expect(shallow(<FormContainer />).find(Input).length).toEqual(3);
});

it('renders one <SelectFromList /> component', () => {
  expect(shallow(<FormContainer />).find(SelectFromList).length).toEqual(1);
});

it('renders givenName input', () => {
  expect(shallow(<FormContainer />).find('#givenName').length).toEqual(1);
});

it('requires Given Name input', () => {
  expect(
    shallow(<FormContainer />)
      .find('#givenName')
      .is('[required]')
  ).toBe(true);
});

it('requires Given Name input - alternative way of testing', () => {
  const wrapper = shallow(<FormContainer />);
  const givenName = wrapper.find('#givenName');
  expect(givenName.props().required).toBe(true);
});

it('should change the Family Name input when the user types', () => {
  const wrapper = shallow(<FormContainer />);
  wrapper
    .find('#familyName')
    .simulate('change', { target: { name: 'familyName', value: 'Stevens' } });
  expect(wrapper.state('familyName')).toEqual('Stevens');
});

it('should change the Age input when the user types or clicks', () => {
  const wrapper = shallow(<FormContainer />);
  wrapper
    .find('#age')
    .simulate('change', { target: { name: 'age', value: '33' } });
  expect(wrapper.state('age')).toEqual('33');
});

it('when simulating a change, select should update its value', () => {
  const wrapper = shallow(<FormContainer />);
  wrapper
    .find('#select')
    .simulate('change', { target: { name: 'genderList', value: 'Male' } });
  expect(wrapper.state('gender')).toBe('Male');
});
