import * as React from 'react';
import { shallow } from 'enzyme';
import Location from 'components/AccountInfo/Location';

describe('Location', () => {

  const wrapper = shallow(
    <Location
      handleLocationChange={jest.fn()}
      handleLocationSelect={jest.fn()}
      location="foo location"
    />
  );

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
