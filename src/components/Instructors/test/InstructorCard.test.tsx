import * as React from 'react';
import { shallow } from 'enzyme';

import InstructorsCard from '../InstructorCard';

describe('InstructorCard', () => {
  const  wrapper = shallow(
    <InstructorsCard
      age={18}
      id={1}
      instruments={[ 'Viloin', 'Piano']}
      bioDescription="foo"
      lessonsTaught={18}
      favorite={true}
      avatarImage=""
      reviewsNumber={9}
      backgroundCheck={true}
      bioTitle="fooo"
      rateStartAt={{'mins30': '50.0'}}
      lastLogin="foo"
      memberSince="2017"
      address="Boston, MA"
      displayName="Vickler Charles"
      fetchInstructor={jest.fn()}
    />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
