import Component from '@glimmer/component';

export default class StepperSignupComponent extends Component {
  constructor() {
    super(...arguments);

    this.currentStep = Number(
      +new URLSearchParams(window.location.search).get('step')
    );
  }
}
