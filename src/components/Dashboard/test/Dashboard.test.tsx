import * as React from 'react';
import { shallow } from 'enzyme';

import { Dashboard } from 'components/Dashboard/Dashboard';
import { Role } from 'components/common/constants/Registration';
import { UserType } from 'redux/models/UserModel';
import { accountInfo } from 'components/AccountInfo/test/mockData';

describe('Dashboard', () => {
  const match = {
    isExact: true,
    params: {
      step: 'fooId'
    },
    path: '/build-request/:id',
    url: '/build-request/fooId'
  };

  const location = {
    state: null,
    hash: '',
    pathname: '/build-request/fooId',
    search: ''
  };

  let mock: any = jest.fn();

  const props = {
    match,
    location,
    history: mock,
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

  const  wrapper = shallow(
    <Dashboard
      firstName=""
      isRequesting={false}
      fetchUser={() => jest.fn}
      user={mockUser}
      {...props}
    />);

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
