import * as React from 'react';
import Instruments from 'components//Instruments/Instruments';
import { shallow } from 'enzyme';

describe('Instruments', () => {
  let wrapper: any;
  const handleChange: () => void = jest.fn();
  const addInstrument: () => void = jest.fn();
  const deleteInstrument: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Instruments
          instruments={[]}
          instrument=""
          skillLevel=""
          handleChange={handleChange}
          addInstrument={addInstrument}
          deleteInstrument={deleteInstrument}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
