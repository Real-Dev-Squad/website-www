import Component from '@glimmer/component';
import { heardFrom } from '../../constants/social-data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { validator } from '../../helpers/validator';

export default class StepThreeComponent extends Component {
  // @tracked foundFrom = '';
  @tracked data = JSON.parse(localStorage.getItem('stepThreeData')) ?? {
    whyRds: '',
    foundFrom: '',
  };
  isValid;
  setIsValid;
  setIsPreValid;
  heardFrom = heardFrom;

  constructor(...args) {
    super(...args);
    this.isValid = this.args.isValid;
    this.setIsValid = this.args.setIsValid;
    this.setIsPreValid = this.args.setIsPreValid;
    const validated =
      validator(this.data.whyRds, 100) && validator(this.data.foundFrom, 1);
    localStorage.setItem('isValid', validated);
    this.setIsPreValid(validated);
  }

  @action inputHandler(e) {
    this.data = { ...this.data, [e.target.name]: e.target.value };
    localStorage.setItem('stepThreeData', JSON.stringify(this.data));
    const validated =
      validator(this.data.whyRds, 100) && validator(this.data.foundFrom, 1);
    this.setIsValid(validated);
    localStorage.setItem('isValid', validated);
  }
}
