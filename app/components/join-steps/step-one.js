import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { countryList } from '../../constants/country-list';
import { validator } from '../../helpers/validator';

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
  
  constructor(...args){
    super(...args);
    this.isValid = this.args.isValid;
    this.setIsValid = this.args.setIsValid;
    this.setIsPreValid = this.args.setIsPreValid;
    const validated = validator(this.data.city, 1) && validator(this.data.state, 1) && validator(this.data.country, 1);
    localStorage.setItem('isValid', validated);
    this.setIsPreValid(validated);
  }

  @action inputHandler(e) {
    this.setIsPreValid(false);
    this.data = { ...this.data, [e.target.name]: e.target.value };
    localStorage.setItem('stepOneData', JSON.stringify(this.data));
    const validated = validator(this.data.city, 1) && validator(this.data.state, 1) && validator(this.data.country, 1);
    this.setIsValid(validated);
    localStorage.setItem('isValid', validated);
  }
}
