import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StepperComponent extends Component {
  @tracked currentStep = 0;

  @action incrementStep() {
    console.log(this.joinData);
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
