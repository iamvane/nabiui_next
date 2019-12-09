import * as React from 'react';
import { shallow } from 'enzyme';

import StudentCard from 'components/Dashboard/InstructorDashboard/StudentCard';
import { studentMockData } from 'components/Dashboard/mockdata';

describe('StudentCard', () => {
  const  wrapper = shallow(
    <StudentCard
      student={studentMockData[0]}
      toggleBuyLessonsForm={jest.fn()}
    />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
