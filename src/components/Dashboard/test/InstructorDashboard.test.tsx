import * as React from 'react';
import { shallow } from 'enzyme';

import { InstructorDashboard } from 'components/Dashboard/InstructorDashboard/InstructorDashboard';
import { requestsMockData } from 'components/Request/mockData';

describe('InstructorDashboard', () => {
  describe('When there are no requests', () => {
    const  wrapper = shallow(
      <InstructorDashboard requests={[]} />
    );

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When there are requests', () => {
    const  wrapper = shallow(
      <InstructorDashboard requests={requestsMockData} />
    );

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
