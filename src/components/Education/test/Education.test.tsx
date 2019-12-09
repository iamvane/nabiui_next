import * as React from 'react';
import { shallow } from 'enzyme';

import { Education } from 'components/Education/Education';
import { EducationType } from 'components/Education/model';

describe('Education', () => {
  let wrapper: any;
  const mockFunction = jest.fn();

  const mockEducation: EducationType = {
    id: 0,
    school: 'UMass',
    graduationYear: '2012',
    degreeType: 'bachelors',
    fieldOfStudy: 'Music Education',
    schoolLocation: 'Boston MA'
  };

  beforeEach(() => {
    wrapper = shallow(
      <Education
        education={[mockEducation]}
        fetchEducation={mockFunction}
        addEducation={mockFunction}
        editEducation={mockFunction}
        deleteEducation={mockFunction}
        isFetchEducationRequesting={false}
        isAddEducationRequesting={false}
        isDeleteEducationRequesting={false}
        isEditEducationRequesting={false}
        fetchEducationError=""
        addEducationError=""
        editEducationError=""
        deleteEducationError=""
      />
    );
  });

  describe('When the education form is hidden', () => {
    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When the education form is displayed', () => {
    beforeEach(() => {
      wrapper.setState({showEducationForm: true});
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Method handleChange()', () => {
    function test_handleChange(theName: string, theValue: any): void {
      describe(`When the event contains ${theName} for name and ${theValue} for value`, () => {
        beforeEach(() => {
          const e = {
            currentTarget: {
              name: theName,
              value: theValue
            }
          };

          wrapper.instance().handleChange(e);
        });

        it(`Sets the state's ${theName} to ${theValue}`, () => {
          expect(wrapper.state(theName)).toBe(theValue);
        });
      });
    }

    test_handleChange('school', 'UMass Boston');
    test_handleChange('graduationYear', 2012);
  });

  describe('Method resetState()', () => {
    beforeEach(() => {
      wrapper.instance().resetState();
    });

    it('Resets the state', () => {
      expect(wrapper.state('id')).toBe(undefined);
      expect(wrapper.state('school')).toBe('');
      expect(wrapper.state('graduationYear')).toBe('');
      expect(wrapper.state('degreeType')).toBe('');
      expect(wrapper.state('fieldOfStudy')).toBe('');
      expect(wrapper.state('schoolLocation')).toBe('');
    });
  });
});
