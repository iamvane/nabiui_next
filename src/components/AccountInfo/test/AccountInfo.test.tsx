import * as React from 'react';
import { shallow } from 'enzyme';
import { AccountInfo } from 'components/AccountInfo/AccountInfo';
import { UserType } from 'redux/models/UserModel';
import { accountInfo } from 'components/AccountInfo/test/mockData';

describe('AccountInfo', () => {
  let wrapper: any;

  const mockFunction = jest.fn();
  const user: UserType = {
    ...accountInfo,
    id: 'fooId',
    email: 'email@company.com',
    password: 'secretPass123',
    role: 'Instructor'
  };

  beforeEach(() => {
    wrapper = shallow(
      <AccountInfo
        user={user}
        fetchUser={mockFunction}
        updateUser={mockFunction}
        nextPath="fooPath"
        redirectUrl="foo"
        isRequestingFetch={false}
        isRequestingUpdate={false}
        errorUpdate=""
      />
    );
  });

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
