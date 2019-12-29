import * as React from 'react';
import ProfileSidebar from 'components/Profile/ProfileSidebar';
import { shallow } from 'enzyme';

describe('ProfileSidebar', () => {
  let wrapper: any;

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProfileSidebar
          online={false}
          studio={false}
          home={false}
          studioAddress=""
          availableDays={{monday: ['8:00AM']}}
          displayName="foo"
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
