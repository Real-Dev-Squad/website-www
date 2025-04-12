const SCHEME = 'https://';
const DOMAIN = 'realdevsquad.com';

export const EVENTS_CATEGORIES = {
  'Upcoming Features': [
    {
      name: 'Art Feature',
      link: `${SCHEME}www-v0.${DOMAIN}/art-feature`,
    },
  ],
  'Upcoming Events': [
    {
      name: 'APIs made Easier',
      link: `${SCHEME}www-v0.${DOMAIN}/event-APIs-made-Easier-April-2021`,
    },
  ],
  'Past Events': [
    {
      name: 'Dynamic Programming',
      link: `${SCHEME}www-v0.${DOMAIN}/event-dynamic-programming-october-2020`,
    },
    {
      name: 'NodeJS Workshop Part I',
      link: `${SCHEME}www-v0.${DOMAIN}/event-nodejs-workshop-october-2020`,
    },
    {
      name: 'Web-Mini-Conf-July-2020',
      link: `${SCHEME}www-v0.${DOMAIN}/event-web-mini-conf-july-2020`,
    },
    {
      name: 'React Hooks Session',
      link: `${SCHEME}www-v0.${DOMAIN}/event-react-hooks-july-2020`,
    },
    {
      name: 'SSR the right way',
      link: `${SCHEME}www-v0.${DOMAIN}/event-ssr-correctly-august-2020`,
    },
  ],
};

export const EVENTS_PAGE_MAPPING = [
  {
    title: 'APIs made Easier',
    description:
      'Building backend services can be challenging, but at Real Dev Squad, our members tackle interesting problems regularly.',
    timing: 'Sunday, April 25th 2021, 12:00pm IST',
    eventLink: 'https://www.airmeet.com/e/d158eec0-a336-11eb-9591-73ebfdac98bb',
    speakers: [
      {
        name: 'Swaraj Rajpure',
        linkedinProfile: 'https://www.linkedin.com/in/swarajrajpure/',
        info: 'App Owner | My Site',
        topicsCovered: ['NoSQL', 'Google Firestore', 'Setup', 'CRUD basics'],
      },
      {
        name: 'Ankur Narkhede',
        linkedinProfile: 'https://www.linkedin.com/in/ankurnarkhede/',
        info: 'App Owner | Backend',
        topicsCovered: [
          'Using Postman',
          'API Testing',
          'Monitoring',
          'Documentation',
          'Mocking',
        ],
      },
    ],
  },
  {
    title: 'Perfecting Event Loops',
    description:
      'Event Loop is an important core concept for web developers and interview questions',
    timing: 'August 9th 2021, 4pm IST',
    eventLink: 'https://airmeet.com/e/b8921040-d5f7-11ea-b1be-e5df193dc3b9',
    speakers: [
      {
        name: 'Vishwanath Arondekar  ',
        linkedinProfile: 'https://www.linkedin.com/in/vishwanath-arondekar/',
        info: 'SDE-III, Dream11 (EX-Disney+Hotstar)',
        topicsCovered: [
          'What the hell is event loop?',
          'JS is single threaded?',
          'Stack, heap, queue?',
          'setTimeout and Promises',
          'Gotchas with event loop',
        ],
      },
    ],
  },
];
