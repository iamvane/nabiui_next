import * as React from 'react';
import { shallow } from 'enzyme';

import InstructorsFilter from '../InstructorsFilter';

describe('InstructorsFilter', () => {
  const mockFuntion = jest.fn();

  const wrapper = shallow(
    <InstructorsFilter
      sortBy=""
      distance={0}
      placeForLessons={[]}
      availability={[]}
      priceRange={[]}
      age="string"
      gender="string"
      handleChange={mockFuntion}
      handlePriceChange={mockFuntion}
      handlePriceCommitted={mockFuntion}
      qualifications={[]}
    />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
