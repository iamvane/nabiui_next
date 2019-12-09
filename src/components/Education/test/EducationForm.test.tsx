import * as React from 'react';
import EducationFields from 'components/Education/EducationForm';
import { shallow } from 'enzyme';
import { DegreeType } from 'components/Education/constants';

describe('EducationForm', () => {
  let wrapper: any;
  const handleChange: () => void = jest.fn();
  const handleSave: () => void = jest.fn();
  const handleCancel: () => void = jest.fn();
  const handleOnBlur: () => void = jest.fn();

  describe('When isEditing is set to false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EducationFields
          handleChange={handleChange}
          handleOnBlur={handleOnBlur}
          handleSave={handleSave}
          allFieldsFilled={false}
          school=""
          graduationYear=""
          degreeType={DegreeType.bachelors}
          fieldOfStudy=""
          schoolLocation=""
          handleCancel={handleCancel}
          isEditing={false}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When isEditing is set to true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EducationFields
          handleChange={handleChange}
          handleOnBlur={handleOnBlur}
          allFieldsFilled={false}
          handleSave={handleSave}
          school=""
          graduationYear=""
          degreeType={DegreeType.bachelors}
          fieldOfStudy=""
          schoolLocation=""
          handleCancel={handleCancel}
          isEditing={true}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
