import * as React from 'react';
import { shallow } from 'enzyme';

import RequestApplied from 'components/Request/RequestApplied';
import { requestsMockData } from 'components/Request/mockData';

describe('RequestApplied', () => {
  let wrapper: any;

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RequestApplied application={requestsMockData[1].application} />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
