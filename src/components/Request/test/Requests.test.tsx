import * as React from 'react';
import { shallow } from 'enzyme';

import Requests from 'components/Request/Requests';
import { RequestType } from 'components/Request/models';

const requests: RequestType[] = [
  {
    instrument: 'Piano',
    placeForLessons: 'studio',
    lessonDuration: '45',
    location: 'Boston, Ma',
    applications: 17,
    createdAt: 'Sun Apr 21 2019 18:51:56',
    requestTitle: 'fun and experience piano instructor',
    requestMessage: 'Lorem Ipsum is simply dummy text of the printing',
    students: [
      {
        name: 'Peter',
        age: 18,
        skillLevel: 'Beginner'
      },
      {
        name: 'Sayvent',
        age: 15,
        skillLevel: 'Beginner'
      }
    ]
  }
];

describe('Requests', () => {
  const  wrapper = shallow(
    <Requests requests={requests} />
  );

  it('Matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
