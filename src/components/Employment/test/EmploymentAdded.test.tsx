import * as React from 'react';
import EmploymentAdded from 'components/Employment/EmploymentAdded';
import { shallow } from 'enzyme';

describe('EmploymentAdded', () => {
  let wrapper: any;
  const deleteEmployment: () => void = jest.fn();
  const editEmployment: () => void = jest.fn();

  describe('When stillWorkHere is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EmploymentAdded
          employer="Oracle"
          jobTitle="Software Engineer"
          jobLocation="Cambridge, MA, USA"
          fromMonth="sep"
          fromYear=""
          toMonth=""
          toYear="2018"
          stillWorkHere={false}
          deleteEmployment={deleteEmployment}
          editEmployment={editEmployment}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When stillWorkHere is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EmploymentAdded
          employer="Oracle"
          jobTitle="Software Engineer"
          jobLocation="Cambridge, MA, USA"
          fromMonth="sep"
          fromYear="2017"
          toMonth="sep"
          toYear="2018"
          stillWorkHere={true}
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
