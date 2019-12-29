import * as React from 'react';
import JobPreferences from 'components/JobPreferences/JobPreferences';
import { shallow } from 'enzyme';

describe('JobPreferences', () => {
  let wrapper: any;
  const handleChange: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <JobPreferences
          handleChange={handleChange}
          oneStudent={false}
          smallGroups={false}
          largeGroups={false}
          children={false}
          teens={false}
          adults={false}
          seniors={false}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
