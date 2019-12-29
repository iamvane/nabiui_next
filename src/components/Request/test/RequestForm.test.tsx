import * as React from 'react';
import { shallow } from 'enzyme';

import RequestForm from 'components/Request/RequestForm';

describe('RequestForm', () => {
  let wrapper: any;
  const mockFunction: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RequestForm
          role="parent"
          handleChange={mockFunction}
          handleBlur={mockFunction}
          handleSubmit={mockFunction}
          handleEditSubmit={mockFunction}
          handleCancel={mockFunction}
          instrument=""
          skillLevel=""
          lessonDuration=""
          placeForLessons=""
          requestTitle=""
          requestMessage=""
          name=""
          age={0}
          addStudent={mockFunction}
          deleteStudent={mockFunction}
          students={[]}
          isEditing={false}
          isCreatingRequest={false}
          isEditingRequest={false}
          allFieldsFilled={false}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
