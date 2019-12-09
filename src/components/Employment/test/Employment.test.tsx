import * as React from 'react';
import { Employment } from 'components/Employment/Employment';
import { shallow } from 'enzyme';
import { EmploymentType } from 'components/Employment/model';

describe('Employment', () => {
  let wrapper: any;
  const mockFunction = jest.fn();

  const mockEmployment: EmploymentType = {
    id: 0,
    employer: 'Oracle',
    jobTitle: 'Software Engineer',
    jobLocation: 'Cambridge',
    fromMonth: 'september',
    fromYear: '2017',
    toMonth: 'march',
    toYear: '2019'
  };

  beforeEach(() => {
    wrapper = shallow(
      <Employment
        employment={[mockEmployment]}
        fetchEmployment={mockFunction}
        addEmployment={mockFunction}
        editEmployment={mockFunction}
        deleteEmployment={mockFunction}
        isFetchEmploymentRequesting={false}
        isAddEmploymentRequesting={false}
        isDeleteEmploymentRequesting={false}
        isEditEmploymentRequesting={false}
        fetchEmploymentError=""
        addEmploymentError=""
        editEmploymentError=""
        deleteEmploymentError=""
      />
    );
  });

  describe('When the employment form is hidden', () => {
    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When the employment form is displayed', () => {
    beforeEach(() => {
      wrapper.setState({showEmploymentForm: true});
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
