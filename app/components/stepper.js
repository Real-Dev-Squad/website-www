import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { TITLE_MESSAGES } from '../constants/stepper-data';
import { inject as service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';
import { JOIN_URL } from '../constants/apis';
import { AUTH } from '../constants/urls';

export default class StepperComponent extends Component {
  @service login;
  @service toast;
  @service router;
  @service fastboot;
  @service store;
  @tracked preValid = false;
  @tracked isValid = JSON.parse(localStorage.getItem('isValid')) ?? false;
  @tracked currentStep =
    +localStorage.getItem('currentStep') ?? +this.args.step ?? 0;
  TITLE_MESSAGES = TITLE_MESSAGES;
  @tracked stepOneData = JSON.parse(localStorage.getItem('stepOneData'));
  @tracked stepTwoData = JSON.parse(localStorage.getItem('stepTwoData'));
  @tracked stepThreeData = JSON.parse(localStorage.getItem('stepThreeData'));
  JOIN_URL = JOIN_URL;

  setIsValid = (newVal) => (this.isValid = newVal);
  setIsPreValid = (newVal) => (this.preValid = newVal);

  constructor() {
    super(...arguments);
    window.onpopstate = () => {
      this.currentStep = Number(
        +new URLSearchParams(window.location.search).get('step')
      );
    };
  }

  @action incrementStep() {
    if (this.currentStep < 5) {
      this.currentStep += 1;
      localStorage.setItem('currentStep', this.currentStep);
      this.router.transitionTo(`/join?step=${this.currentStep}`);
    }
  }

  @action decrementStep() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
      localStorage.setItem('currentStep', this.currentStep);
      this.router.transitionTo(`/join?step=${this.currentStep}`);
    }
  }

  @action async startHandler() {
    if (this.login.isLoggedIn && !this.login.isLoading) {
      localStorage.setItem('id', this.login.userData.id);
      localStorage.setItem('first_name', this.login.userData.first_name);
      localStorage.setItem('last_name', this.login.userData.last_name);
      this.incrementStep();
    } else {
      // window.alert('You are not logged in.');
      this.toast.error('You are not logged in', 'User Exist!', TOAST_OPTIONS);
      const currentURL = this.fastboot.isFastBoot
        ? this.fastboot.request.protocol +
          '//' +
          this.fastboot.request.host +
          this.fastboot.request.path
        : window.location.href;
      console.log(AUTH.SIGN_IN, 'signin');
      window.location.href = `${AUTH.SIGN_IN}?redirectURL=${currentURL}`;
    }
    const user = await this.store.findRecord('user', 'self');
    console.log('user data', user);
    if (user) {
      console.log('user', user.roles.archived);
      if (user.roles.archived) {
        window.alert('Archived user');
      }
    }
  }

  @action nextStep(e) {
    e.preventDefault();
    this.incrementStep();
    localStorage.setItem('isValid', false);
    this.isValid = false;
  }

  @action async joinHandler() {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    const data = JSON.stringify({
      firstName,
      lastName,
      ...this.stepOneData,
      ...this.stepTwoData,
      ...this.stepThreeData,
    });
    try {
      const response = await fetch(this.JOIN_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: data,
      });

      if (response.status === 201) {
        this.toast.success(
          'Successfully submitted the form',
          'Success!',
          TOAST_OPTIONS
        );
        this.incrementStep();
      } else if (response.status === 409) {
        this.toast.error(
          'You have already filled the form',
          'User Exist!',
          TOAST_OPTIONS
        );
      }
    } catch (err) {
      this.toast.error('Some error occured', 'Error ocurred!', TOAST_OPTIONS);
      console.log('Error: ', err);
    }
  }
}
