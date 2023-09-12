import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class StepperSignupComponent extends Component {
  constructor() {
    super(...arguments);

    this.currentStep = Number(
      new URLSearchParams(window.location.search).get('step')
    );
  }

  @tracked signupDetails = {
    firstname: '',
    lastname: '',
    username: '',
  };

  @action handleInputChange(key, value) {
    set(this.signupDetails, key, value);
  }

  @action setUsername(generateUsername) {
    this.signupDetails.username = generateUsername;
  }
}
