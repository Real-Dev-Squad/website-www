import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { PROFILE_STATUS } from '../../constants/stepper-signup-data';
import { action } from '@ember/object';

export default class IdentityStepsStepSevenComponent extends Component {
  @service login;
  @service router;

  currentProfileStatus = [
    {
      status: PROFILE_STATUS.PENDING,
      heading: 'Pending',
      icon: 'hourglass-half',
    },
    {
      status: PROFILE_STATUS.BLOCKED,
      heading: 'Blocked',
      icon: 'ban',
    },
  ];

  @action goToGenerateChaincodePage() {
    let currentStep = this.args.currentStep;
    currentStep -= 3;
    const queryParams = { dev: true, step: currentStep };
    this.router.transitionTo('join', { queryParams });
  }
}
