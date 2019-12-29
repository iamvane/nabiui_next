import * as React from 'react';
import PlaceForLessonsForm from 'components/PlaceForLessons/PlaceForLessonsForm';
import { shallow } from 'enzyme';

describe('PlaceForLessonsForm', () => {
  let wrapper: any;

  const handleChange: () => void = jest.fn();
  const handleChangePlaceForLessons: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlaceForLessonsForm
          handleChange={handleChange}
          handleChangePlaceForLessons={handleChangePlaceForLessons}
          home={false}
          studio={false}
          online={false}
          studioAddress=""
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
