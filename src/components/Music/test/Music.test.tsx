import * as React from 'react';
import Music from 'components/Music/Music';
import { shallow } from 'enzyme';

describe('Music', () => {
  let wrapper: any;
  const deleteMusic: () => void = jest.fn();
  const addMusic: () => void = jest.fn();
  const handleChange: () => void = jest.fn();
  const toggleMusicForm: () => void = jest.fn();
  const clearError: () => void = jest.fn();
  const handleCancel: () => void = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Music
        deleteMusic={deleteMusic}
        handleChange={handleChange}
        addMusic={addMusic}
        toggleMusicForm={toggleMusicForm}
        clearError={clearError}
        handleCancel={handleCancel}
        embedCode=""
        typeOfEmbedCode=""
        music={[]}
        errorMessage=""
        showMusicForm={false}
      />);
  });

  describe('When there is an error', () => {
    wrapper = shallow(
      <Music
        deleteMusic={deleteMusic}
        handleChange={handleChange}
        addMusic={addMusic}
        toggleMusicForm={toggleMusicForm}
        clearError={clearError}
        handleCancel={handleCancel}
        embedCode=""
        typeOfEmbedCode=""
        music={[]}
        errorMessage="foo error"
        showMusicForm={true}
      />);
  });

  describe('When the music form is showing', () => {
    wrapper = shallow(
      <Music
        deleteMusic={deleteMusic}
        handleChange={handleChange}
        addMusic={addMusic}
        toggleMusicForm={toggleMusicForm}
        clearError={clearError}
        handleCancel={handleCancel}
        embedCode=""
        typeOfEmbedCode=""
        music={[]}
        errorMessage=""
        showMusicForm={true}
      />);
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
