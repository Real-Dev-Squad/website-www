import Component from '@glimmer/component';
import { heardFrom } from '../../constants/social-data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { validator } from '../../utils/validator';
import { debounce } from '@ember/runloop';
import { JOIN_DEBOUNCE_TIME } from '../../constants/join';

export default class StepThreeComponent extends Component {
  @tracked data = JSON.parse(localStorage.getItem('stepThreeData')) ?? {
    whyRds: '',
    foundFrom: '',
    numberOfHours: '',
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
    this.setIsPreValid(false);
    const setValToLocalStorage = () => {
      let inputValue = e.target.value;
      if (e.target.name === 'numberOfHours') {
        inputValue = parseInt(inputValue);
      }
      this.data = { ...this.data, [e.target.name]: inputValue };
      localStorage.setItem('stepThreeData', JSON.stringify(this.data));
      const validated =
        validator(this.data.whyRds, 100) &&
        validator(this.data.foundFrom, 1) &&
        (e.target.name === 'numberOfHours'
          ? inputValue >= 1 && inputValue <= 100
          : true);
      this.setIsValid(validated);
      localStorage.setItem('isValid', validated);
    };
    debounce(this.data, setValToLocalStorage, JOIN_DEBOUNCE_TIME);
  }
}
