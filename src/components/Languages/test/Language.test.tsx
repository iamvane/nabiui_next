import * as React from 'react';
import { Languages } from 'components/Languages/Languages';
import { shallow } from 'enzyme';

describe('Language', () => {
  let wrapper: any;
  const handleChangeLanguage: () => void = jest.fn();
  const addLanguague: () => void = jest.fn();
  const deleteLanguage: () => void = jest.fn();

  const languages: string[] =  ['spanish', 'french'];

  describe('Shallow', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Languages
          languages={languages}
          language=""
          handleChangeLanguage={handleChangeLanguage}
          addLanguage={addLanguague}
          deleteLanguage={deleteLanguage}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
