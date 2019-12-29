import * as React from 'react';
import PlaceForLessons from 'components/PlaceForLessons/PlaceForLessons';
import { shallow } from 'enzyme';

describe('PlaceForLessons', () => {
  let wrapper: any;

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlaceForLessons
         home={false}
         studio={false}
         studioAddress=""
         online={false}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
