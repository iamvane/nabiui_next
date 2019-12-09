import * as React from 'react';

import { shallow } from 'enzyme';
import { PhoneValidation } from 'components/AccountInfo/PhoneValidation';
import { UserType } from 'redux/models/UserModel';
import { accountInfo } from 'components/AccountInfo/test/mockData';

describe('PhoneValidation', () => {
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
      <PhoneValidation
        user={user}
        isRequestingToken={false}
        isVerifyingToken={false}
        errorRequestToken=""
        errorVerifyToken=""
        requestTokenMessage=""
        verifyTokenMessage=""
        fetchUser={mockFunction}
        requestToken={mockFunction}
        verifyToken={mockFunction}
        resetRequestTokenMessage={mockFunction}
      />
    );
  });

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
