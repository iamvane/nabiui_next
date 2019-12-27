import * as React from 'react';
import { shallow } from 'enzyme';

import RequestsFilter from '../RequestsFilter';

describe('RequestsFilter', () => {
  const mockFunction = jest.fn();

  const wrapper = shallow(
    <RequestsFilter
      instrument=""
      handleChange={mockFunction}
      distance="8 miles"
      home={false}
      skillLevel=""
      studio={false}
      online={false}
      zipCode=""
      lessonDuration=""
    />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
