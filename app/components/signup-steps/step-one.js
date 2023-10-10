import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { ROLE } from '../../constants/stepper-signup-data';
import { JOIN_DEBOUNCE_TIME } from '../../constants/join';
import { APPS } from '../../constants/urls';
import { toastNotificationTimeoutOptions } from '../../constants/toast-notification';
export default class SignupStepsStepOneComponent extends Component {
  @service toast;
  @tracked data = { firstname: '', lastname: '', username: '', role: '' };
  @tracked isSignupButtonDisabled = true;
  @tracked isValid = true;
  @tracked mavenRoleConfirm = false;
  role = ROLE;
  @tracked errorMessage = {
    firstname: '',
    lastname: '',
  };
  @tracked currentStep = 1;

  nameValidator(name) {
    const pattern = /^[a-zA-Z]{1,20}$/;

    if (pattern.test(name)) {
      return { isValid: false };
    } else {
      return { isValid: true };
    }
  }

  isSignupDetailsFilled() {
    if (this.data.role === 'Maven') {
      return (
        !!this.data.firstname &&
        !!this.data.lastname &&
        !!this.data.username &&
        !!this.data.role &&
        this.mavenRoleConfirm
      );
    } else {
      return (
        !!this.data.firstname &&
        !!this.data.lastname &&
        !!this.data.username &&
        !!this.data.role
      );
    }
  }

  @action inputHandler(e) {
    const passVal = () => {
      this.data = {
        ...this.data,
        [e.target.name]: e.target.value,
      };
      this.mavenRoleConfirm = e.target.checked;
      if (this.isSignupDetailsFilled()) {
        this.isSignupButtonDisabled = false;
      } else {
        this.isSignupButtonDisabled = true;
      }
      const field = e.target.name;
      if (field === 'firstname' || field === 'lastname') {
        const { isValid } = this.nameValidator(e.target.value);
        this.errorMessage = {
          ...this.errorMessage,
          [field]: isValid
            ? `No spaces, numbers, or special characters allowed.`
            : '',
        };
      }
      if (
        this.data.firstname.trim() > '' &&
        this.data.lastname.trim() > '' &&
        this.errorMessage.firstname === '' &&
        this.errorMessage.lastname === ''
      ) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    };

    debounce(this.data, passVal, JOIN_DEBOUNCE_TIME);
  }

  @action async getUsername() {
    try {
      const firstname = this.data.firstname.toLowerCase();
      const lastname = this.data.lastname.toLowerCase();
      const response = await fetch(
        `${APPS.API_BACKEND}/users/username?firstname=${firstname}&lastname=${lastname}&dev=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        this.data = {
          ...this.data,
          username: data.username,
        };
      } else if (response.status === 401) {
        this.toast.error(
          'Please login to continue.',
          '',
          toastNotificationTimeoutOptions
        );
      }
    } catch (err) {
      console.log('Error: ', 'Something went wrong');
    }
  }

  @action handleButtonClick() {
    this.isSignupButtonDisabled = true;
    this.signup();
    localStorage.setItem('role', this.data.role);
  }

  @action async signup() {
    this.args.incrementStep();
  }
}
