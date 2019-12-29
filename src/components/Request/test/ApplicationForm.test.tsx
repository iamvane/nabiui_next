import * as React from 'react';
import { shallow } from 'enzyme';

import ApplicationForm from 'components/Request/ApplicationForm';
import { requestsMockData } from 'components/Request/mockData';

describe('ApplicationForm', () => {
  let wrapper: any;
  const mockFunction: () => void = jest.fn();

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ApplicationForm
          handleChange={mockFunction}
          handleSubmit={mockFunction}
          request={requestsMockData[0]}
          values={{lessonRate: 50, message: 'foomessage'}}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
