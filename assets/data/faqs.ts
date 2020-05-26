export interface FAQItem {
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
  targetBlank?: boolean;
}

export const parentStudentFaqs: FAQItem[] = [
  {
    question: 'What is Nabi Music?',
    answer: 'Nabi Music makes music education easily accessible for children, allowing parents to connect with qualified instructors nearby and providing unique features that motivate parents’ involvement in their children musical path.'
  },
  {
    question: 'What age does my child need to be?',
    answer: 'We suggest at lest 4.'
  },
  {
    question: 'What are the prices?/ How much are lessons?',
    answer: 'We have three lesson packages: The Artist, includes 4 lessons, The Maestro, includes 8 lessons, and The Virtuoso, includes 12 lessons. Our instructors set their own rate, thus the price per lesson depends on the instructor’s rate. Go to our {linkReplace} to find your instructor.',
    linkText: 'instructors list',
    linkUrl: '/instructors'
  },
  {
    question: 'Where are the teaching locations?',
    answer: 'You can take lessons online, at home or at the instructor’s studio.'
  },
  {
    question: 'Does Nabi provide group lessons?',
    answer: 'Yes. Please check out our event calendar on our {linkReplace}.',
    linkText: 'Facebook page',
    linkUrl: 'https://www.facebook.com/pg/nabimusicinfo/events',
    targetBlank: true
  },
  {
    question: 'Does Nabi run background checks on instructors?',
    answer: 'Yes. We have a background check feature that instructors can use to easily purchase a background check. Parents and students can also choose to purchase a background check for their instructor.'
  },
  {
    question: 'How does Nabi vet instructors?',
    answer: 'We interview our instructors and ask for references. We also have a background check feature instructors or parents can use to run background checks. Instructors are also reviewed by other students. Explore {linkReplace} to find the right fit.',
    linkText: 'their profiles',
    linkUrl: '/instructors'
  },
  {
    question: 'Does Nabi have a free trial?',
    answer: 'Yes. Every lesson package includes a free lesson for new students. After the free lesson if you are not satisfied you can switch instructors or get a full refund. {linkReplace}.',
    linkText: 'Start your trial today',
    linkUrl: '/registration'
  },
  {
    question: 'Does Nabi provide lessons for adults?',
    answer: 'Yes. All age groups are welcome to use our services.'
  },
  {
    question: 'Can I take lessons at home?',
    answer: 'You can take lessons online, at home or at the instructor’s studio.'
  },
  {
    question: 'Does Nabi have a rewards/referral program?',
    answer: 'Yes. For every student you invite, you get $5 in cash when they purchase their first lesson package. For every instructor you invite, you get $5 when they successfully teach a lesson.'
  },
  {
    question: 'What instruments can I learn with Nabi?',
    answer: 'Our instructors can teach a wide range of musical instruments including voice, piano, drums, guitar, violin, saxophone and more. Checkout our {linkReplace} to learn more.',
    linkText: 'instructors list',
    linkUrl: '/instructors'
  },
  {
    question: 'Does Nabi provide the instruments?',
    answer: 'Not at the moment. Students should have their own instruments.'
  },
  {
    question: 'Where are the teaching locations?',
    answer: 'You can take lessons online, at home or at the instructor’s studio.'
  },
  {
    question: 'Where are the lessons?',
    answer: 'You can take lessons online, at home or at the instructor’s studio.'
  },
  {
    question: 'What cities do you offer your service to?',
    answer: 'Currently New York and Massachusetts.'
  },
  {
    question: 'I am an adult, can I still take lessons?',
    answer: 'Yes. All age groups are welcome to use our services.'
  },
  {
    question: 'How can I change my instructor?',
    answer: 'If you want to change your instructor email us at info@nabimusic.com.'
  },
  {
    question: 'How can I pay for my lessons?',
    answer: 'You can pay online using your credit or debit card.'
  },
  {
    question: 'What kind of music do you teach?',
    answer: 'Our instructors can teach a wide range of styles, from classical to rock and roll! See our {linkReplace} to learn more.',
    linkText: 'nstructors list',
    linkUrl: '/instructors'
  },
  {
    question: 'What course materials do you provide? What do students need to bring?',
    answer: 'Each instructor is free to teach using their own style and should advise their students of any materials they may need. Students are expected to have their own instrument at time of instruction.'
  }
];

export const instructorFaqs: FAQItem[] = [
  {
    question: 'What is Nabi Music?',
    answer: 'Nabi Music makes music education easily accessible for children, allowing parents to connect with qualified instructors nearby and providing unique features that motivate parents’ involvement in their children musical path.'
  },
  {
    question: 'How do I start teaching?',
    answer: 'Start by signing up and building yoru profile. Visit our {linkReplace} and submit your application. After a parent or student reviews your application and profile they can book lessons with you.',
    linkText: 'list of jobs',
    linkUrl: '/requests'
  },
  {
    question: 'Are the lessons online or in person?',
    answer: 'You can teach at the student’s house, online, or at your studio.'
  },
  {
    question: 'How much does Nabi pay?',
    answer: 'You set your own lesson rate.'

  },
  {
    question: 'What cities do you offere yoru service to?',
    answer: 'Currently New York and Massachusetts'
  },
]

export const linkReplace = '{linkReplace}';
