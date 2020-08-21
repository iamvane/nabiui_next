export namespace MessagesComponent {
  export const pageTitle = 'Messages';
}

export const dummyContacts = [
  {
    avatar: "",
    name: "Vanessa C.",
    lastMessage: "Great work as usual. Please practice the scale. Hands separate and hands together.",
    lastMessageDate: "2020-08-20T13:18:57-04:00"
  },
  {
    avatar: "",
    name: "Nabi Music",
    lastMessage: "I love that song too. He is one of my favorite artists of all time.",
    lastMessageDate: "2020-08-17T13:18:57-04:00"
  },
  {
    avatar: "",
    name: "Vanessa C., Phoenix",
    lastMessage: "Next class we can try singing along the piece. Sometimes it helps us hear better.",
    lastMessageDate: "2020-08-15T13:18:57-04:00"
  }
];

export const dummyConversation = [
  {
    date: '2020-08-15T13:18:57-04:00',
    messages: [
      {
        sender: 1,
        message: 'Hello, what should I practice today?'
      },
      {
        sender: 2,
        message: 'Practive somewhere over the rainbow'
      },
      {
        sender: 1,
        message: 'Cool. Thanks!'
      }
    ]
  },
  {
    date: '2020-08-15T13:18:57-04:00',
    messages: [
      {
        sender: 1,
        message: 'I practice now what?'
      },
      {
        sender: 2,
        message: 'Please buy more lessons, and keep learning!'
      },
      {
        sender: 1,
        message: 'Okay!'
      }
    ]
  },
]

export namespace ContactItemComponent {
  export const previewLength = 36;
}
