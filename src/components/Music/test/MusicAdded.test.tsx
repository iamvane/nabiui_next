import * as React from 'react';
import MusicAdded from 'components/Music/MusicAdded';
import { shallow } from 'enzyme';

describe('MusicAdded', () => {
  let wrapper: any;
  const deleteMusic: () => void = jest.fn();
  const addMusic: () => void = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <MusicAdded
        deleteMusic={deleteMusic}
        addMusic={addMusic}
        embedCode={<iframe />}
      />
      );
  });

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
