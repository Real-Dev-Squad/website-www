import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { TITLE_MESSAGES } from '../constants/stepper-data';

export default class StepperComponent extends Component {
  @tracked currentStep = 0;

  TITLE_MESSAGES = TITLE_MESSAGES;

  @action incrementStep() {
    if (this.currentStep < 5) {
      this.currentStep += 1;
    }
  }

  @action decrementStep() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }
}
