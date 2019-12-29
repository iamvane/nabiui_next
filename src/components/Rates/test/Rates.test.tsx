import * as React from 'react';
import Rates from 'components/Rates/Rates';
import { shallow } from 'enzyme';

describe('Rates', () => {
  let wrapper: any;
  const handleChange: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Rates
          handleChange={handleChange}
          mins30={0}
          mins45={0}
          mins60={0}
          mins90={0}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
