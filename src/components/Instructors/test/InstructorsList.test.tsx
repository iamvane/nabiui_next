import * as React from 'react';
import { shallow } from 'enzyme';

import { InstructorsList } from '../InstructorsList';

const mockFunction = jest.fn();
describe('InstructorsList', () => {
  const wrapper = shallow(
  <InstructorsList
    instructors={{
      count: 0,
      previous: '',
      next: '',
      results: [{ id: 0}]
    }}
    instructor={{
      userId: 0
    }}
    isRequesting={false}
    isRequestingInstructor={false}
    fetchInstructors={mockFunction}
    fetchInstructor={mockFunction}
  />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
