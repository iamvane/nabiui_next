import * as React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { RequestBuilder } from 'components/RequestBuilder/RequestBuilder';

const mockStore = configureMockStore();
const store = mockStore({});

describe('RequestBuilder', () => {
  let wrapper: any;

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

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <RequestBuilder {...props}/>
      </Provider>
    );
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
