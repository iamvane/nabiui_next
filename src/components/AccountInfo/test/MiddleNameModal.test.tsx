import * as React from 'react';
import { shallow } from 'enzyme';
import MiddleNameModal from 'components/AccountInfo/MiddleNameModal';

describe('MiddleNameModal', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <MiddleNameModal
        isFormDialogOpen={false}
        closeHandler={jest.fn()}
        handleChange={jest.fn()}
        middleName="middleName"
        confirmNoMiddleName={jest.fn()}
        applyMiddleName={jest.fn()}
      />
    );
  });

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
