import * as React from 'react';
import { shallow } from 'enzyme';
import { Recommendations } from 'components/Recommendations/Recommendations';
import { UserType } from 'redux/models/UserModel';
import { accountInfo } from 'components/AccountInfo/test/mockData';

let mock: any = jest.fn();
const match = {
  isExact: true,
  params: {},
  path: '/request-references',
  url: '/request-references'
};

const location = {
  state: null,
  hash: '',
  pathname: '/request-references',
  search: ''
};
const props = {
  match,
  location,
  history: mock,
};

describe('Recommendations', () => {
  let wrapper: any;

  const mockUser: UserType = {
    ...accountInfo,
    id: 'fooId',
    firstName: 'foo',
    lastName: 'bar',
    email: 'oreo',
    password: '',
    zipCode: '',
    role: 'instructor',
    displayName: ''
  };

  beforeEach(() => {
    wrapper = shallow(
      <Recommendations
        user={mockUser}
        isRequestingReference={false}
        message=""
        requestReference={mock}
        fetchReferences={mock}
        references={['foo']}
        isFetchingReference={false}
        errorRequestReferences=""
        errorFetchReferences=""
        {...props}
      />
    );
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
