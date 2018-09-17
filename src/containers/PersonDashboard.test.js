import React from 'react';
import { shallow } from 'enzyme';
import PersonDashboard from './PersonDashboard';
import Input from '../components/common/Input';
import Navbar from '../components/common/Navbar';
import SelectFromList from '../components/common/RadioButtonGroup';

describe('PersonDashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PersonDashboard />);
  });

  it('renders one <Input /> components', () => {
    expect(wrapper.find(Input).length).toEqual(1);
  });
});
