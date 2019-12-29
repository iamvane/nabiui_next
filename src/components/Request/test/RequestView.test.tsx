import * as React from 'react';
import { shallow } from 'enzyme';

import { RequestView } from 'components/Request/RequestView';
import { requestsMockData } from 'components/Request/mockData';

describe('RequestView', () => {
  const match = {
    isExact: true,
    params: {
      id: 'fooId'
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
    fetchRequest: jest.fn()
  };

  describe('When the request was applied to', () => {
    const wrapper = shallow(<RequestView request={requestsMockData[1]} {...props} />);

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When the request was not applied to', () => {
    const wrapper = shallow(<RequestView request={requestsMockData[0]} {...props} />);

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
