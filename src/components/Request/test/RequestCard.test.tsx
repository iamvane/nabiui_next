import * as React from 'react';
import { shallow } from 'enzyme';

import RequestCard from 'components/Request/RequestCard';
import { requestsMockData } from 'components/Request/mockData';

describe('RequestCard', () => {
  const  wrapper = shallow(
    <RequestCard request={requestsMockData[0]} />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
