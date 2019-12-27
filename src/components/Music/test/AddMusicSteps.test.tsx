import * as React from 'react';
import AddMusicSteps from 'components/Music/AddMusicSteps';
import { shallow } from 'enzyme';

describe('AddMusicSteps', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <AddMusicSteps stepImages={[]} />
    );
  });

  it('Renders the component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
