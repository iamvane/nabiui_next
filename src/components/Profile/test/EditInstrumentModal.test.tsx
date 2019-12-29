import * as React from 'react';
import EditInstrumentsModal from 'components/Profile/EditInstrumentsModal';
import { shallow } from 'enzyme';

describe('EditIntrumentsModal', () => {
  let wrapper: any;
  const mockFunction = jest.fn();

  describe('When the dialog is closed', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EditInstrumentsModal
          instruments={[]}
          instrument=""
          skillLevel=""
          closeHandler={mockFunction}
          handleSubmit={mockFunction}
          isFormDialogOpen={false}
          handleChange={mockFunction}
          addInstrument={mockFunction}
          deleteInstrument={mockFunction}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When the dialog is open', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EditInstrumentsModal
          instruments={[]}
          instrument=""
          skillLevel=""
          closeHandler={mockFunction}
          handleSubmit={mockFunction}
          isFormDialogOpen={true}
          handleChange={mockFunction}
          addInstrument={mockFunction}
          deleteInstrument={mockFunction}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
