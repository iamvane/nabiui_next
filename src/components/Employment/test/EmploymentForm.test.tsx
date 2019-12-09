import * as React from 'react';
import EmploymentFields from 'components/Employment/EmploymentForm';
import { shallow } from 'enzyme';

describe('EmploymentForm', () => {
  let wrapper: any;
  const handleChange: () => void = jest.fn();
  const handleSave: () => void = jest.fn();
  const handleCancel: () => void = jest.fn();
  const handleOnBlur: () => void = jest.fn();

  describe('When stillWorkHere is set to false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EmploymentFields
          handleChange={handleChange}
          handleOnBlur={handleOnBlur}
          allFieldsFilled={false}
          handleSave={handleSave}
          stillWorkHere={false}
          employer="Oracle"
          jobTitle="Software Engineer"
          jobLocation="Cambridge, MA, USA"
          fromMonth="sep"
          fromYear="2017"
          toMonth="sep"
          toYear="2018"
          isEditing={false}
          handleCancel={handleCancel}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When stillWorkHere is set to true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EmploymentFields
          handleOnBlur={handleOnBlur}
          allFieldsFilled={false}
          handleChange={handleChange}
          handleSave={handleSave}
          stillWorkHere={true}
          employer="Oracle"
          jobTitle="Software Engineer"
          jobLocation="Cambridge, MA, USA"
          fromMonth="sep"
          fromYear="2017"
          toMonth="sep"
          toYear="2018"
          isEditing={false}
          handleCancel={handleCancel}
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
        <EmploymentFields
          handleChange={handleChange}
          handleOnBlur={handleOnBlur}
          allFieldsFilled={false}
          handleSave={handleSave}
          stillWorkHere={true}
          employer="Oracle"
          jobTitle="Software Engineer"
          jobLocation="Cambridge, MA, USA"
          fromMonth="sep"
          fromYear="2017"
          toMonth="sep"
          toYear="2018"
          isEditing={true}
          handleCancel={handleCancel}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
