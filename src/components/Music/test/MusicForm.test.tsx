import * as React from 'react';
import MusicForm from 'components/Music/MusicForm';
import { shallow } from 'enzyme';

describe('MusicForm', () => {
  let wrapper: any;
  const handleChange: () => void = jest.fn();
  const addMusic: () => void = jest.fn();
  const handleCancel: () => void = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <MusicForm
        handleChange={handleChange}
        embedCode=""
        addMusic={addMusic}
        handleCancel={handleCancel}
        typeOfEmbedCode=""
      />
      );
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
   });
});
