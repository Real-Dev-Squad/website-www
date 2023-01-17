import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { countryList } from '../../constants/country-list';

export default class StepOneComponent extends Component {
  @tracked city = '';
  @tracked state = '';
  @tracked country = '';

  countries = countryList;
}
