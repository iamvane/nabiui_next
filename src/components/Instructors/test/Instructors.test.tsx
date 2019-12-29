import * as React from 'react';
import { shallow } from 'enzyme';

import Instructors from '../Instructors';

describe('Instructors', () => {
  const  wrapper = shallow(
    <Instructors
      instructors={[{}]}
      fetchInstructor={jest.fn()}
      isRequestingInstructor={false}
      instructor={{
        userId: 0
      }}
    />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
