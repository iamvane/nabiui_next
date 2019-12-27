import * as React from 'react';
import { shallow } from 'enzyme';

import RequestAdded from 'components/Request/RequestAdded';

describe('RequestAdded', () => {
  let wrapper: any;
  const mockFunction: () => void = jest.fn();

  describe('When editing is disabled', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RequestAdded
          notEditable={true}
          deleteRequest={mockFunction}
          editRequest={mockFunction}
          instrument="piano"
          lessonDuration="45 mins"
          placeForLessons="At Home"
          requestTitle="Piano teacher needed"
          requestMessage="Here I am!"
          students={[
            {
              name: 'Roxana',
              age: 22,
              skillLevel: 'beginner'
            }
          ]}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When editing is enabled', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RequestAdded
          notEditable={false}
          deleteRequest={mockFunction}
          editRequest={mockFunction}
          instrument="piano"
          lessonDuration="45 mins"
          placeForLessons="At Home"
          requestTitle="Piano teacher needed"
          requestMessage="Here I am!"
          students={[
            {
              name: 'Roxana',
              age: 22,
              skillLevel: 'beginner'
            }
          ]}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
