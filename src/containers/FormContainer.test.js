import React from 'react';
import { shallow } from 'enzyme';
import FormContainer from './FormContainer';

it('renders without crashing', () => {
  shallow(<FormContainer />);
});

it('renders givenName input', () => {
  expect(shallow(<FormContainer />).find('#givenName').length).toEqual(1);
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
