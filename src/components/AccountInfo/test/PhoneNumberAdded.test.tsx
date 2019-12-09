import * as React from 'react';

import { shallow } from 'enzyme';
import PhoneNumberAdded from 'components/AccountInfo/PhoneNumberAdded';

describe('PhoneNumberAdded', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <PhoneNumberAdded
        phoneNumber="232312313"
      />
    );
  });

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
