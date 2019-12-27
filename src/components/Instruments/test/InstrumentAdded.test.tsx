import * as React from 'react';
import InstrumentAdded from 'components/Instruments/InstrumentAdded';
import { shallow } from 'enzyme';

describe('InstrumentAdded', () => {
  let wrapper: any;
  const deleteInstrument: (instrumentName: string) => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <InstrumentAdded
          instrument=""
          skillLevel=""
          deleteInstrument={deleteInstrument}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
