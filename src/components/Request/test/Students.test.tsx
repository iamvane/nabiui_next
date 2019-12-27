import * as React from 'react';
import { shallow } from 'enzyme';

import Students from 'components/Request/Students';

describe('Students', () => {
  let wrapper: any;
  const mockFunction: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Students
          handleChange={mockFunction}
          addStudent={mockFunction}
          deleteStudent={mockFunction}
          name="Roxana"
          age={22}
          skillLevel="beginner"
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
