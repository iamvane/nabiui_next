import * as React from 'react';
import { shallow } from 'enzyme';
import BookLessons from 'components/BookLessons/BookLessons';

describe('BookLessons', () => {
  const wrapper = shallow(<BookLessons lessonPrice={50.00} />);

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
