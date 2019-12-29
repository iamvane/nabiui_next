import * as React from 'react';
import { shallow } from 'enzyme';
import Reviews from 'components/Reviews/Reviews';

describe('Reviews', () => {
  let wrapper: any;

  describe('Shallow', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Reviews
            avatarImage=""
            name=""
            rating={0}
            comment=""
            date="2018-06-20T15:19:25.000Z"
          />
        );
      });

      it('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
});
