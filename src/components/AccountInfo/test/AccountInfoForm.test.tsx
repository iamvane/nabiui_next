import * as React from 'react';
import { shallow } from 'enzyme';
import AccountInfoForm from 'components/AccountInfo/AccountInfoForm';

import { UserType } from 'redux/models/UserModel';
import { VerificationChannel } from 'components/AccountInfo/models';
import { accountInfo } from 'components/AccountInfo/test/mockData';

describe('MiddleNameModal', () => {
  let wrapper: any;
  const user: UserType = {
    ...accountInfo,
    id: 'fooId',
    email: 'email@company.com',
    password: 'secretPass123',
    role: 'Instructor'
  };

  beforeEach(() => {
    wrapper = shallow(
      <AccountInfoForm
        user={user}
        accountInfo={accountInfo}
        verificationChannel={VerificationChannel.Text}
        showMiddleNameModal={false}
        closeMiddleNameModal={jest.fn()}
        confirmNoMiddleName={jest.fn()}
        applyMiddleName={jest.fn()}
        errors={{}}
        redirectUrl="fooUrl"
        handleChange={jest.fn()}
        handleLocationChange={jest.fn()}
        handleLocationSelect={jest.fn()}
        location="foo location"
      />
    );
  });

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
