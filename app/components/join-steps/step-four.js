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
      key: 'city',
      label: 'Your City',
      data: '',
    },
    {
      id: 'two',
      key: 'state',
      label: 'Your State',
      data: '',
    },
    {
      id: 'three',
      key: 'country',
      label: 'Your Country',
      data: '',
    },
    {
      id: 'four',
      key: 'introduction',
      label: 'Your Introduction',
      data: '',
    },
    {
      id: 'five',
      key: 'skills',
      label: 'Your Skills',
      data: '',
    },
    {
      id: 'six',
      key: 'college',
      label: 'Your Institution',
      data: '',
    },
    {
      id: 'seven',
      key: 'forFun',
      label: 'What do you do for fun?',
      data: '',
    },
    {
      id: 'eight',
      key: 'funFact',
      label: 'Fun facts about you',
      data: '',
    },
    {
      id: 'nine',
      key: 'whyRds',
      label: 'Why do you want to join Real Dev Squad?',
      data: '',
    },
    {
      id: 'ten',
      key: 'numberOfHours',
      label: 'How many hours per week, are you willing to contribute?',
      data: '',
    },
    {
      id: 'eleven',
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
  }
}
