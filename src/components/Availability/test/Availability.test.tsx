import * as React from 'react';
import Availability from 'components/Availability/Availability';
import { shallow } from 'enzyme';

describe('Availability', () => {
  let wrapper: any;
  const mockFunction = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Availability
        handleChange={mockFunction}
        renderCheckbox={mockFunction}
      />
    );
  });

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
