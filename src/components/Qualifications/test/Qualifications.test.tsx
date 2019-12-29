import * as React from 'react';
import Qualifications from 'components/Qualifications/Qualifications';
import { shallow } from 'enzyme';

describe('Qualifications', () => {
    let wrapper: any;
    const handleChange: (event: React.FormEvent<{}>) => void = jest.fn();

    describe('Shallow', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Qualifications
            handleChange={handleChange}
            certifiedTeacher={false}
            musicTherapy={false}
            musicProduction={false}
            earTraining={false}
            conducting={false}
            virtuosoRecognition={false}
            performance={false}
            musicTheory={false}
            youngChildrenExperience={false}
            repertoireSelection={false}
          />
        );
      });

      it('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
