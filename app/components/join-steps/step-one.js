import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { countryList } from '../../constants/country-list';
import { validator } from '../../utils/validator';
import { debounce } from '@ember/runloop';
import { STEP_ONE_LIMITS, JOIN_DEBOUNCE_TIME } from '../../constants/join';

export default class StepOneComponent extends Component {
  @tracked data = JSON.parse(localStorage.getItem('stepOneData')) ?? {
    city: '',
    state: '',
    country: '',
  };
  isValid;
  setIsValid;
  setIsPreValid;
  countries = countryList;

  constructor(...args) {
    super(...args);
    this.isValid = this.args.isValid;
    this.setIsValid = this.args.setIsValid;
    this.setIsPreValid = this.args.setIsPreValid;
    const validated = this.isDataValid();
    localStorage.setItem('isValid', validated);
    this.setIsPreValid(validated);
  }
  isDataValid() {
    for (let field in this.data) {
      const { isValid } = validator(this.data[field], STEP_ONE_LIMITS[field]);
      if (!isValid) {
        return false;
      }
    }
    return true;
  }

  @action inputHandler(e) {
    this.setIsPreValid(false);
    const setValToLocalStorage = () => {
      this.data = { ...this.data, [e.target.name]: e.target.value };
      localStorage.setItem('stepOneData', JSON.stringify(this.data));
      const validated = this.isDataValid();
      this.setIsValid(validated);
      localStorage.setItem('isValid', validated);
    };
    debounce(this.data, setValToLocalStorage, JOIN_DEBOUNCE_TIME);
  }
}
