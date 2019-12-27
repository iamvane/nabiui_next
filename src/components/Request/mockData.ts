export const requestsMockData = [
  {
    id: 0,
    applied: false,
    user: {
      id: '0',
      email: 'rox@gmail.com',
      role: 'student',
      firstName: 'Roxana',
      lastName: 'Gallardo',
      displayName: 'Roxana G.',
      distance: '0.5 mi away',
      birthday: '1996-07-12T04:00:00.000Z'
    },
    instrument: 'piano',
    placeForLessons: 'studio',
    lessonDuration: '45',
    location: 'Boston, Ma',
    applications: 17,
    createdAt: '2019-08-05T23:01:25.000Z',
    title: 'Fun and experience piano instructor',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industria',
    students: [
      {
        name: 'Roxana',
        age: 18,
        skillLevel: 'beginner'
      },
    ]
  },
  {
    id: 1,
    applied: true,
    application: {
      createdAt: 'Mon Aug 22, 2019 at 2:00pm EDT',
      rate: 50,
      message: 'Hello Sam, I would love to work with your family and typesetting industria  Ipsum is simply dummy.'
    },
    user: {
      id: '1',
      email: 'sam@gmail.com',
      role: 'parent',
      firstName: 'Sam',
      lastName: 'Flood',
      displayName: 'Sam F.',
      distance: '0.5 mi away'
    },
    instrument: 'piano',
    placeForLessons: 'home',
    lessonDuration: '45',
    createdAt: '2019-08-05T20:19:25.000Z',
    location: 'Boston, Ma',
    applications: 17,
    title: 'Piano teacher needed for my family',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industria',
    students: [
      {
        name: 'Zoe',
        age: 6,
        skillLevel: 'beginner'
      },
      {
        name: 'Esme',
        age: 9,
        skillLevel: 'beginner'
      }
    ]
  },
  {
    id: 2,
    applied: false,
    user: {
      id: '2',
      email: 'victor@gmail.com',
      role: 'parent',
      firstName: 'Victor',
      lastName: 'Charles',
      displayName: 'Victor C.',
      distance: '1 mi away'
    },
    instrument: 'piano',
    placeForLessons: 'home',
    lessonDuration: '45',
    createdAt: '2019-08-05T15:19:25.000Z',
    location: 'Boston, Ma',
    applications: 17,
    title: 'Instructor for one child in Boston',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industria',
    students: [
      {
        name: 'Ethan',
        age: 11,
        skillLevel: 'beginner'
      },
    ]
  }
];
