import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import PersonDashboard from '../../containers/PersonDashboard';

describe('Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PersonDashboard />);
  });

  it('renders one <Button /> components', () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it('`button` should be disabled', () => {
    const button = wrapper.find('Button').first();
    expect(button.props().disabled).toBe('disabled');
  });

  describe('the user populates the input', () => {
    const searchName = 'Ada';

    beforeEach(() => {
      const input = wrapper.find('Input').first();
      input.simulate('change', {
        target: { value: searchName, name: 'name' }
      });
    });

    it('should update the state property person.name', () => {
      expect(wrapper.state().person.name).toEqual(searchName);
    });

    it('should enable `button`', () => {
      const button = wrapper.find('Button').first();
      expect(button.props().disabled).toBe(null);
    });

    describe('and then clears the input', () => {
      beforeEach(() => {
        const input = wrapper.find('Input').first();
        input.simulate('change', {
          target: { value: '', name: 'name' }
        });
      });

      it('should disable the `button`', () => {
        const button = wrapper.find('Button').first();
        expect(button.props().disabled).toBe('disabled');
      });

      describe('the spinner is loaded when the request is processing', () => {
        beforeEach(() => {
          wrapper.setState({ isRequestLoading: true }, () => {
            expect(wrapper.state()).toEqual({
              person: {
                name: ''
              },
              data: [],
              isRequestLoading: true,
              isRequestError: false,
              isRequestMade: false,
              showModal: false
            });
          });
        });
      });
    });
  });
});
