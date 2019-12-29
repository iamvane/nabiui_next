import * as React from 'react';
import { shallow } from 'enzyme';

import { RequestsList } from '../RequestsList';
import { requestsMockData } from 'components/Request/mockData';

describe('RequestsList', () => {
  const wrapper = shallow(<RequestsList requests={requestsMockData} />);

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
