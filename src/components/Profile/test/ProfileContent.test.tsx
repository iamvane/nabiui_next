import * as React from 'react';
import ProfileContent from 'components/Profile/ProfileContent';
import { shallow } from 'enzyme';

describe('ProfileContent', () => {

  let wrapper: any;
  const deleteEducation: () => void = jest.fn();
  const editEducation: () => void = jest.fn();
  const deleteEmployment: () => void = jest.fn();
  const editEmployment: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ProfileContent
          bio="er"
          employment={[]}
          education={[]}
          reviews={[]}
          qualifications={[]}
          music={[]}
          displayName="vic"
          deleteEducation={deleteEducation}
          editEducation={editEducation}
          deleteEmployment={deleteEmployment}
          editEmployment={editEmployment}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
