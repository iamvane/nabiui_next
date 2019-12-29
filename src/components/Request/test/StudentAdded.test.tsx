import * as React from 'react';
import { shallow } from 'enzyme';

import StudentAdded from 'components/Request/StudentAdded';

describe('RequestAdded', () => {
  let wrapper: any;
  const mockFunction: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <StudentAdded
          deleteStudent={mockFunction}
          name="Roxana"
          age={22}
          skillLevel="beginner"
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
