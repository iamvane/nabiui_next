import * as React from 'react';
import SelectedEmail from 'components/Recommendations/SelectedEmail';
import { shallow } from 'enzyme';

describe('SelectedEmail', () => {
  let wrapper: any;

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SelectedEmail email="" />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
