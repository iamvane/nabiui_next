import * as React from 'react';
import { shallow } from 'enzyme';

import PhoneValidationForm from 'components/AccountInfo/PhoneValidationForm';
import { UserType } from 'redux/models/UserModel';
import { VerificationChannel } from 'components/AccountInfo/models';
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

  describe('When the phone is not set', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PhoneValidationForm
          user={user}
          phoneNumber=""
          handleChange={mockFunction}
          isPhoneSet={false}
          token=""
          verifyToken={mockFunction}
          verificationChannel={VerificationChannel.Text}
          resendCode={mockFunction}
          errors={{}}
          sendVerificationToken={mockFunction}
          isRequesting={false}
        />
      );
    });

    it('Renders the component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When the phone is set', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PhoneValidationForm
          handleChange={mockFunction}
          phoneNumber=""
          isPhoneSet={true}
          user={user}
          token=""
          errors={{}}
          verifyToken={mockFunction}
          verificationChannel={VerificationChannel.Text}
          resendCode={mockFunction}
          sendVerificationToken={mockFunction}
          isRequesting={false}
        />
      );
    });

    it('Renders the component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When isPhoneVerified is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PhoneValidationForm
          handleChange={mockFunction}
          phoneNumber=""
          isPhoneSet={true}
          token=""
          verifyToken={mockFunction}
          user={user}
          verificationChannel={VerificationChannel.Text}
          resendCode={mockFunction}
          errors={{}}
          sendVerificationToken={mockFunction}
          isRequesting={false}
        />
      );
    });

    it('Renders the component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
