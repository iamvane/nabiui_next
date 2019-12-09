import * as React from 'react';
import { shallow } from 'enzyme';
import EducationAdded from 'components/Education/EducationAdded';
import { DegreeType } from 'components/Education/constants';

describe('EducationAdded', () => {
  let wrapper: any;
  const deleteEducation: () => void = jest.fn();
  const editEducation: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EducationAdded
          editEducation={editEducation}
          deleteEducation={deleteEducation}
          school=""
          graduationYear=""
          degreeType={DegreeType.bachelors}
          fieldOfStudy=""
          schoolLocation=""
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
