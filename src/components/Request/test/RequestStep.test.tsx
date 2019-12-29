import * as React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Role } from 'components/common/constants/Registration';
import { Request, Props } from 'components/Request/RequestStep';

const request = {
  id: 0,
  instrument: 'Mandolin',
  placeForLessons: 'At home',
  lessonDuration: '45 mins',
  requestTitle: 'foo title',
  requestMessage: 'foo message',
  skillLevel: '',
  students: [{
    name: 'Vicky',
    age: 28,
    skillLevel: 'Beginner'
  }]
};

describe('Request', () => {
  let wrapper: any;

  let mock: any = jest.fn();

  const props: Props = {
    role: Role.parent,
    userId: 'foo',
    createRequest: mock,
    fetchRequests: mock,
    editRequest: mock,
    deleteRequest: mock,
    requests: [],
    request,
    isFetchingRequest: false,
    isCreatingRequest: false,
    isDeletingRequest: false,
    isEditingRequest: false,
    isFetchingRequests: false,
    editRequestMessage: '',
    deleteRequestMessage: ''
  };

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter>
        <Request {...props} />
      </MemoryRouter>
    ).find(Request).dive();
  });

  describe('When the role is "parent"', () => {
    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When the role is "student"', () => {
    beforeEach(() => {
      wrapper.setState({ role: Role.student });
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Method handleChange()', () => {
    function test_handleChange(name: string, value: string): void {
      describe('When the event contains ' + name + ' for name and ' + value + ' for value', () => {
        beforeEach(() => {
          const event = {
            currentTarget: {
              name: name,
              value: value
            }
          };
          wrapper.instance().handleChange(event);
        });

        it('Sets the state\'s ' + name + ' to ' + value, () => {
          expect(wrapper.state('requestDetail')[name]).toBe(value);
        });
      });
    }

    test_handleChange('instrument', 'Foo');
    test_handleChange('skillLevel', 'Bar');
    test_handleChange('placeForLessons', 'Foobar');
    test_handleChange('lessonDuration', 'Elit');
    test_handleChange('requestTitle', 'Quz');
    test_handleChange('requestMessage', 'Quz');
  });

  describe('When it has requests', () => {
    beforeEach(() => {
      wrapper = shallow(
        <MemoryRouter>
          <Request {...props} />
        </MemoryRouter>
      ).find(Request).dive();
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
