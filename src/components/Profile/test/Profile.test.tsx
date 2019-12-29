
import * as React from 'react';
import { Profile } from 'components/Profile/Profile';
import { shallow } from 'enzyme';
import { Role } from 'components/common/constants/Registration';
import { UserType } from 'redux/models/UserModel';
import { InstructorType } from 'redux/models/InstructorModel';
import { accountInfo } from 'components/AccountInfo/test/mockData';

Date.now = jest.fn(() => new Date(Date.UTC(2017, 7, 9, 8)).valueOf());

let mock: any = jest.fn();
const match = {
  isExact: true,
  params: {
    instructorId: 1
  },
  path: '/profile/:instructorId',
  url: '/profile/1'
};

const location = {
  state: null,
  hash: '',
  pathname: '/profile/1',
  search: ''
};
const props = {
  match,
  location,
  history: mock,
};

describe('Profile', () => {
  let wrapper: any;
  const changeAvatar: (email: string, avatar: string) => {} = jest.fn();
  const updateInstructor: (instructor: InstructorType) => {} = jest.fn();
  const fetchInstructor: (id: number) => {} = jest.fn();

  const mockInstructor: InstructorType = {
    userId: 0,
  };

  const mockUser: UserType = {
    ...accountInfo,
    id: 'fooId',
    firstName: 'foo',
    lastName: 'bar',
    email: 'oreo',
    password: '',
    zipCode: '',
    role: Role.instructor,
    displayName: ''
  };

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Profile
          user={mockUser}
          changeAvatar={changeAvatar}
          instructor={mockInstructor}
          updateInstructor={updateInstructor}
          fetchInstructor={fetchInstructor}
          isRequestingInstructor={false}
          {...props}
        />
      );
    });

    describe('Method handleChange()', () => {
      function test_handleChange(theName: string, theValue: string): void {
        describe(`When the event contains ${theName} for name and ${theValue} for value`, () => {
          beforeEach(() => {
            const e = {
              currentTarget: {
                name: theName,
                value: theValue
              }
            };

            wrapper.instance().handleChange(e);
          });

          it(`Sets the state's ${theName} to ${theValue}`, () => {
            expect(wrapper.state(theName)).toBe(theValue);
          });
        });
      }

      test_handleChange('displayName', 'La Va');
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
