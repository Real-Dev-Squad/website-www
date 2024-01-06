import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';

const MAX_STEP = 15;
const MIN_STEP = 0;
export default class StepperSignupComponent extends Component {
  @service login;
  @service router;
  @service toast;
  @service onboarding;
  @tracked preValid = false;
  @tracked isValid = JSON.parse(localStorage.getItem('isValid')) ?? false;
  @tracked currentStep =
    Number(localStorage.getItem('currentStep')) ?? Number(this.args.step) ?? 0;
  @tracked stepOneData = JSON.parse(localStorage.getItem('stepOneData'));
  @tracked stepTwoData = JSON.parse(localStorage.getItem('stepTwoData'));
  @tracked stepThreeData = JSON.parse(localStorage.getItem('stepThreeData'));
  setIsValid = (newVal) => (this.isValid = newVal);
  setIsPreValid = (newVal) => (this.preValid = newVal);
  constructor() {
    super(...arguments);

    this.currentStep = Number(
      new URLSearchParams(window.location.search).get('step'),
    );
  }

  @action decrementStep() {
    if (this.currentStep > MIN_STEP) {
      this.currentStep -= 1;
      const queryParams = { dev: true, step: this.currentStep };
      this.router.transitionTo('join', { queryParams });
    }
  }

  @action incrementStep() {
    if (this.currentStep < MAX_STEP) {
      this.currentStep += 1;
      const queryParams = { dev: true, step: this.currentStep };
      this.router.transitionTo('join', { queryParams });
    }
  }

  @action startHandler() {
    if (this.login.isLoggedIn && !this.login.isLoading) {
      this.incrementStep();
    }
  }

  @action nextStep(e) {
    e.preventDefault();
    this.incrementStep();
    localStorage.setItem('isValid', false);
    this.isValid = false;
  }

  @action handleRefresh() {
    window.location.reload();
  }

  @action goToGenerateChaincodePage() {
    this.currentStep -= 3;
    const queryParams = { dev: true, step: this.currentStep };
    this.router.transitionTo('join', { queryParams });
  }

  @action async applicationHandler() {
    const firstName = this.login.userData.first_name;
    const lastName = this.login.userData.last_name;
    const data = JSON.stringify({
      firstName,
      lastName,
      ...this.stepOneData,
      ...this.stepTwoData,
      ...this.stepThreeData,
    });

    const response = await this.onboarding.addApplication(data);

    if (response.status === 201) {
      this.toast.success(
        'Successfully submitted the form',
        'Success!',
        TOAST_OPTIONS,
      );
      this.incrementStep();
    } else if (response.status === 409) {
      this.toast.error(
        'You have already filled the form',
        'User Exist!',
        TOAST_OPTIONS,
      );
    }
  }
}
