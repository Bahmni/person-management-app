import React from 'react';
import { shallow } from 'enzyme';
import PersonDashboard from './PersonDashboard';
import Input from '../components/common/Input';

describe('PersonDashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PersonDashboard />);
  });

  it('renders one <Input /> components', () => {
    expect(wrapper.find(Input).length).toEqual(1);
  });

  it('`button` should be disabled', () => {
    const button = wrapper.find('Button').first();
    expect(button.props().disabled).toBe('disabled');
  });
});
