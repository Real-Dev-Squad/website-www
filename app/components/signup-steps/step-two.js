import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class SignupStepsStepTwoComponent extends Component {
  @tracked role = localStorage.getItem('role');
}
