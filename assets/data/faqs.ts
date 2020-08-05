export interface FAQItem {
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
  linkTexts?: string[];
  linkUrls?: string[];
  replacementTexts?: string[];
  targetBlank?: boolean;
}

export const parentStudentFaqs: FAQItem[] = [
  {
    question: 'What is Nabi Music?',
    answer: 'Nabi Music is an online music education network. \n Nabi Music provides an innovative music learning experience for children. Nabi allows parents to connect with qualified instructors worldwide and provides unique features that motivate parents\' involvement in their children\'s musical path.'
  },
  {
    question: 'What age does my child need to be?',
    answer: 'We recommend at least 4.'
  },
  {
    question: 'What are the prices?/ How much are lessons?',
    answer: 'We have three lesson packages: The Artist, includes 4 lessons, The Maestro, includes 8 lessons, and The Virtuoso, includes 12 lessons. Our instructors set their own rate, thus the price per lesson depends on the instructor\'s rate. Go to our {linkReplace} to find your instructor.',
    linkText: 'instructors list',
    linkUrl: '/instructors'
  },
  {
    question: 'Where do lessons take place?',
    answer: 'Online via Zoom.'
  },
  {
    question: 'How long are the lessons?',
    answer: '30 mins.',
  },
  {
    question: 'Does Nabi run background checks on instructors?',
    answer: 'Yes. We have a background check feature that instructors can use to easily purchase a background check. Instructors with a verified background check have a background check badge on their profile.'
  },
  {
    question: 'How does Nabi vet instructors?',
    answer: 'We run background checks and ask for references. Instructors are also reviewed by other students. Explore {linkReplace} to find the right fit.',
    linkText: 'their profiles',
    linkUrl: '/instructors'
  },
  {
    question: 'Does Nabi have a free trial?',
    answer: 'Yes. Every new student gets a free lesson.'
  },
  {
    question: 'Does Nabi provide lessons for adults?',
    answer: 'Yes. All age groups are welcome to use our services.'
  },
  {
    question: 'Can I take lessons at home?',
    answer: 'A: You can take lessons in the comfort of your home. You will need a device with a camera and microphone and good internet connectivity to meet with your instructor. {linkReplace} has great tips on how to prepare for online music lessons.',
    linkText: 'This article',
    linkUrl: 'https://blog.nabimusic.com/how-to-prepare-for-online-music-lessons'
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
    question: 'Where are the lessons?',
    answer: ' Online via Zoom.'
  },
  {
    question: 'Where are you located?',
    answer: 'We are based in New York and operate mostly online. Our instructors are from all over the country and even other places in the world, such as Canada, Italy and even Egypt. Lessons take place online via Zoom.'
  },
  {
    question: 'How can I change my instructor',
    answer: 'To change your instructor you can contact us using the chat widget, or by emailing us at info@nabimusic.com.'
  },
  {
    question: 'I am an adult, can I still take lessons?',
    answer: 'Yes. All age groups are welcome to use our services.'
  },
  {
    question: 'How can I pay for my lessons?',
    answer: 'You can pay online using your credit or debit card.'
  },
  {
    question: 'What kind of music do you teach?',
    answer: 'We have over 700 music instructors who teach from classical to rock and roll!. See our {linkReplace} to learn more.',
    linkText: 'nstructors list',
    linkUrl: '/instructors'
  },
  {
    question: 'What course materials do you provide? What do students need to bring?',
    answer: 'Nabi Music Instructors will advise their students in what books to buy. Students are expected to have their own instrument at time of instruction.'
  },
  {
    question: 'When do students get the free trial?',
    answer: 'Students get the free trial when they first sign up. They will be paired with an instructor who has agreed to participate in a free trial lesson.'
  },
  {
    question: 'How long is the trial?',
    answer: 'The trial is 30 minutes long, and it is a chance for you to meet your instructor and share your goals.'
  },
  {
    question: 'Where does the trial take place?',
    answer: 'Online via Zoom.'
  },
  {
    question: 'What happens after the trial?',
    answer: 'The instructor grades the student and the students or parents can decide to continue lessons with the instructor with one of our lesson plans.'
  }
];

export const instructorFaqs: FAQItem[] = [
  {
    question: 'What is Nabi Music?',
    answer: 'Nabi Music is an online music education network. \n Nabi Music provides an innovative music learning experience for children. Nabi allows parents to connect with qualified instructors worldwide and provides unique features that motivate parents\' involvement in their children\'s musical path.'
  },
  {
    question: 'How do I start teaching?',
    answer: 'Start by {signUp} and building your profile. Visit our {listOfJobs} and submit your application. After applying you may be assigned to a student.',
    linkTexts: ['signing up', 'list of jobs'],
    replacementTexts: ['{signUp}', '{listOfJobs}'],
    linkUrls: ['/registration', '/requests']
  },
  {
    question: 'Are the lessons online or in person?',
    answer: 'Online via Zoom.'
  },
  {
    question: 'How much does Nabi pay?',
    answer: 'You set your own lesson rate.'

  },
  {
    question: 'I am interested in teaching music',
    answer: 'To find students, you must complete the {linkReplace}.',
    linkText: 'Instructor Registration',
    linkUrl: '/registration-instructor'
  },
  {
    question: 'I am a current instructor at Nabi and I would like to know when I’ll be getting students?',
    answer: 'We are really glad that you are part of our community. We are currently working on different marketing strategies to capture more students. As soon as someone books a lesson with you, we will notify you. In the meantime, we encourage you to keep in touch by following us on {facebook}, {twitter}, {instagram}, {pinterest} or {linkedIn}.',
    linkTexts: ['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'LinkedIn'],
    replacementTexts: ['{facebook}', '{twitter}', '{instagram}', '{pinterest}', '{linkedIn}'],
    linkUrls: ['https://www.facebook.com/nabimusicinfo', 'https://twitter.com/_nabimusic', 'https://www.instagram.com/_nabimusic', 'https://www.pinterest.com/nabimusic_/', 'https://www.linkedin.com/organization-guest/company/nabimusic']
  },
  {
    question: 'When do students get the free trial? ',
    answer: 'Students get the free trial when they first sign up. They will be paired with an instructor who has agreed to participate in a free trial lesson.'
  },
  {
    question: 'How long is the trial? ',
    answer: 'The trial is 30 minutes long, and it is a great chance for you to introduce yourself and introduce the basics of the instrument and your lesson plan.'
  },
  {
    question: 'Do instructors get paid for this lesson?',
    answer: 'No. This is a free lesson, it gives the student and instructor a chance to get to know each other, see the students level and develop a relationship.'
  },
  {
    question: 'Where does the trial take place?',
    answer: 'Online via Zoom. You and the student will be sent an email before your lesson with a Zoom link. Make sure to have a reliable device to participate.'
  },
  {
    question: 'What happens after the trial?',
    answer: 'The instructor grades the student and the students or parents can decide to continue lessons with the instructor with one of our lesson plans.'
  }
];

export const linkReplace = '{linkReplace}';
