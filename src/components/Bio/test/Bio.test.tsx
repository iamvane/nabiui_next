import * as React from 'react';
import { shallow } from 'enzyme';

import Bio from 'components/Bio/Bio';
import { UserType } from 'redux/models/UserModel';
import { Role } from 'components/common/constants/Registration';
import { accountInfo } from 'components/AccountInfo/test/mockData';

describe('Bio', () => {
  let wrapper: any;
  const handleChange: () => {} = jest.fn();
  const handleOnBlur: () => {} = jest.fn();

  const user: UserType = {
    ...accountInfo,
    id: '',
    email: '',
    password: '',
    zipCode: '',
    role: Role.instructor,
    displayName: '',
  };

  beforeEach(() => {
    wrapper = shallow(
      <Bio
        bioTitle=""
        bioDescription=""
        user={user}
        handleChange={handleChange}
        handleOnBlur={handleOnBlur}
      />
    );
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
