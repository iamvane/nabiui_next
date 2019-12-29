import * as React from 'react';
import EditRatesModal from 'components/Profile/EditRatesModal';
import { shallow } from 'enzyme';

describe('EditRatesModal', () => {
  let wrapper: any;
  const mockFunction = jest.fn();

  describe('When the dialog is closed', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EditRatesModal
          mins30={0}
          mins45={0}
          mins60={0}
          mins90={0}
          closeHandler={mockFunction}
          handleSubmit={mockFunction}
          isFormDialogOpen={false}
          handleChange={mockFunction}
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
        <EditRatesModal
          mins30={0}
          mins45={0}
          mins60={0}
          mins90={0}
          closeHandler={mockFunction}
          handleSubmit={mockFunction}
          isFormDialogOpen={true}
          handleChange={mockFunction}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
