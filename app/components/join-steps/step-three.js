import Component from '@glimmer/component';
import { heardFrom } from '../../constants/social-data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { validator } from '../../utils/validator';
import { debounce } from '@ember/runloop';

export default class StepThreeComponent extends Component {
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
    console.log('I am ruuning');
    this.setIsPreValid(false);
    const setValToLocalStorage = () => {
      this.data = { ...this.data, [e.target.name]: e.target.value };
      localStorage.setItem('stepThreeData', JSON.stringify(this.data));
      const validated =
        validator(this.data.whyRds, 100) && validator(this.data.foundFrom, 1);
      this.setIsValid(validated);
      localStorage.setItem('isValid', validated);
    };
    debounce(this.data, setValToLocalStorage, 1000);
  }
}
