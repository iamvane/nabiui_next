import * as React from 'react';
import { shallow } from 'enzyme';

import LanguageAdded from 'components/Languages/LanguageAdded';

describe('LanguageAdded', () => {
    let wrapper: any;
    const deleteLanguage: (languageName: string) => void = jest.fn();

    describe('Shallow', () => {
      beforeEach(() => {
        wrapper = shallow(
          <LanguageAdded
           deleteLanguage={deleteLanguage}
           language=""
          />
        );
      });

      it('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
