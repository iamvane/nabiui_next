import * as React from 'react';
import { shallow } from 'enzyme';

import BuyMoreLessons from 'components/Dashboard/InstructorDashboard/BuyMoreLessons';
import { studentMockData } from 'components/Dashboard/mockdata';

describe('BuyMoreLessons', () => {
  const mockFunction = jest.fn();

  const  wrapper = shallow(
    <BuyMoreLessons
      isOpen={true}
      student={studentMockData[0]}
      closeHandler={mockFunction}
      handleSubmit={mockFunction}
      handleChange={mockFunction}
      error=""
      lessonRate="10.00"
      lessonDuration="45 mins"
    />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
