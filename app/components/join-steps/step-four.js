import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StepFourComponent extends Component {
  @tracked stepOneData = JSON.parse(localStorage.getItem('stepOneData'));
  @tracked stepTwoData = JSON.parse(localStorage.getItem('stepTwoData'));
  @tracked stepThreeData = JSON.parse(localStorage.getItem('stepThreeData'));
  @tracked allStepsData = {};
  JOIN_DATA = [
    {
      id: 'one',
      key: 'first_name',
      label: 'First Name',
      data: '',
    },
    {
      id: 'two',
      key: 'last_name',
      label: 'Last Name',
      data: '',
    },
    {
      id: 'three',
      key: 'city',
      label: 'Your City',
      data: '',
    },
    {
      id: 'four',
      key: 'state',
      label: 'Your State',
      data: '',
    },
    {
      id: 'five',
      key: 'country',
      label: 'Your Country',
      data: '',
    },
    {
      id: 'six',
      key: 'introduction',
      label: 'Your Introduction',
      data: '',
    },
    {
      id: 'seven',
      key: 'skills',
      label: 'Your Skills',
      data: '',
    },
    {
      id: 'eight',
      key: 'college',
      label: 'Your Institution',
      data: '',
    },
    {
      id: 'nine',
      key: 'forFun',
      label: 'What do you do for fun?',
      data: '',
    },
    {
      id: 'ten',
      key: 'funFact',
      label: 'Fun facts about you',
      data: '',
    },
    {
      id: 'eleven',
      key: 'whyRds',
      label: 'Why do you want to join Real Dev Squad?',
      data: '',
    },
    {
      id: 'twelve',
      key: 'numberOfHours',
      label: 'How many hours per week, are you willing to contribute?',
      data: '',
    },
    {
      id: 'thirteen',
      key: 'foundFrom',
      label: 'How did you hear about us?',
      data: '',
    },
  ];

  constructor(...args) {
    super(...args);
    this.allStepsData = {
      ...this.stepOneData,
      ...this.stepTwoData,
      ...this.stepThreeData,
    };

    this.JOIN_DATA.forEach((data) => {
      const key = data.key;
      data.data = this.allStepsData[key];
    });

    this.JOIN_DATA[0].data = localStorage.getItem('first_name');
    this.JOIN_DATA[1].data = localStorage.getItem('last_name');
  }
}
