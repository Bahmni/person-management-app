import React from 'react';
import { shallow } from 'enzyme';
import EditPerson from './EditPerson';
import Input from '../components/common/Input';
import SelectFromList from '../components/common/Dropdown';

jest.mock('../api/personApi', () => {
  return {
    fetchPerson: jest.fn(() => {
      return Promise.resolve({
        status: 200,
        json: jest.fn(() =>
          Promise.resolve({
            display: 'John Doe',
            uuid: '819ba69e-6c13-4803-8a14-d7abfac66e99',
            gender: 'M',
            birthdate: '1990-01-01',
            birthdateEstimated: false,
            attributes: [
              {
                display: 'occupation = Teacher'
              }
            ]
          })
        )
      });
    }),
    fetchPersonAttributeConfig: jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: jest.fn(() =>
          Promise.resolve({
            config: {
              personAttributesForRelations: [
                {
                  name: 'occupation',
                  attributeName: 'occupationNew',
                  text: 'Occupation'
                }
              ]
            }
          })
        )
      })
    ),
    getPersonAttributeTypeUuid: jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: jest.fn(() =>
          Promise.resolve({
            results: [
              {
                uuid: '8d871d18-c2cc-11de-8d13-0010c6dffd0f',
                display: 'Occupation'
              }
            ]
          })
        )
      })
    )
  };
});

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
    expect(wrapper.find(Input).length).toEqual(7);
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

  it('renders occupation input', () => {
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('#occupation').length).toEqual(1);
      done();
    }, 1000);
  });

  describe('the user populates email input', () => {
    const exampleOccupation = 'Teacher';
    let firstNameInput;

    it('should update the state property email', () => {
      setTimeout(() => {
        wrapper.update();
        firstNameInput = wrapper.find('#occupation');
        firstNameInput.simulate('change', {
          target: { value: exampleOccupation, name: 'occupation' }
        });
        expect(wrapper.state().attributes[0].value).toEqual(exampleOccupation);
        done();
      }, 1000);
    });
  });
});
