import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { APPS } from '../constants/urls';
import { TOAST_OPTIONS } from '../constants/toast-options';
import {
  CHECK_USERNAME_AVAILABILITY,
  GENERATE_USERNAME_LINK,
  SELF_USER_PROFILE_URL,
  SELF_USERS_URL,
} from '../constants/apis';
import {
  SIGNUP_ERROR_MESSAGES,
  NEW_SIGNUP_STEPS,
} from '../constants/new-signup';
import apiRequest from '../utils/api-request';

export default class NewSignupController extends Controller {
  @service toast;

  queryParams = ['currentStep', 'dev', 'signupDev'];

  @tracked dev;
  @tracked signupDev;
  @tracked isLoading = false;
  @tracked isButtonDisabled = true;
  @tracked error = '';
  @tracked currentStep = NEW_SIGNUP_STEPS[0];
  FIRST_STEP = NEW_SIGNUP_STEPS[0];
  SECOND_STEP = NEW_SIGNUP_STEPS[1];
  THIRD_STEP = NEW_SIGNUP_STEPS[2];
  FOURTH_STEP = NEW_SIGNUP_STEPS[3];
  FIFTH_STEP = NEW_SIGNUP_STEPS[4];
  LAST_STEP = NEW_SIGNUP_STEPS[5];

  @tracked signupDetails = {
    firstName: '',
    lastName: '',
    username: '',
    roles: {},
  };

  get isDevMode() {
    // replace this signupDev with dev flag once new-signup page is not under dev flag
    return this.signupDev === 'true';
  }

  async generateUsername(firstname, lastname) {
    if (typeof firstname !== 'string' || typeof lastname !== 'string') {
      throw new Error(SIGNUP_ERROR_MESSAGES.invalidInput);
    }
    try {
      const sanitizedFirstname = firstname.toLowerCase();
      const sanitizedLastname = lastname.toLowerCase();

      const response = await apiRequest(
        GENERATE_USERNAME_LINK(sanitizedFirstname, sanitizedLastname),
      );

      const user = await response.json();
      if (user && user.username) {
        return user;
      }
      throw new Error(SIGNUP_ERROR_MESSAGES.usernameGeneration);
    } catch (error) {
      this.toast.error(
        SIGNUP_ERROR_MESSAGES.usernameGeneration,
        'error!',
        TOAST_OPTIONS,
      );
      throw new Error(SIGNUP_ERROR_MESSAGES.usernameGeneration);
    }
  }

  async checkUserName(userName) {
    try {
      const response = await apiRequest(CHECK_USERNAME_AVAILABILITY(userName));
      const data = await response.json();
      const { isUsernameAvailable } = data;
      return isUsernameAvailable;
    } catch (error) {
      this.toast.error(SIGNUP_ERROR_MESSAGES.others, 'error!', TOAST_OPTIONS);
      return false;
    }
  }

  async registerUser(user) {
    await apiRequest(SELF_USERS_URL, 'PATCH', user);
  }

  async newRegisterUser(signupDetails, roles) {
    const getResponse = await apiRequest(SELF_USER_PROFILE_URL);
    const userData = await getResponse.json();

    const res = await this.registerUser({
      ...signupDetails,
      roles: {
        ...userData.roles,
        ...roles,
      },
    });

    if (!res) {
      throw new Error(SIGNUP_ERROR_MESSAGES.others);
    }
    return res;
  }

  @action changeStep(step) {
    this.currentStep = step;

    if (step !== this.SECOND_STEP) {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }
  }

  @action register() {
    this.isButtonDisabled = true;
    this.signup();
  }

  @action completeSignUp() {
    const url = new URL(APPS.GOTO);
    if (this.dev === 'true') {
      url.searchParams.set('dev', 'true');
    }
    window.open(url.toString(), '_self');
  }

  @action handleInputChange(key, value) {
    this.error = '';
    set(this.signupDetails, key, value);
    if (this.signupDetails[key].trim() !== '') this.isButtonDisabled = false;
    else this.isButtonDisabled = true;
  }

  @action handleCheckboxInputChange(key, value) {
    set(this.signupDetails.roles, key, value);
    if (Object.values(this.signupDetails.roles).includes(true)) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  @action async signup() {
    try {
      let user;
      this.isLoading = true;
      if (!this.isDevMode)
        user = await this.generateUsername(
          this.signupDetails.firstName,
          this.signupDetails.lastName,
        );
      const signupDetails = {
        first_name: this.signupDetails.firstName,
        last_name: this.signupDetails.lastName,
        username: this.isDevMode ? this.signupDetails.username : user.username,
      };
      const roles = {};
      Object.entries(this.signupDetails.roles).forEach(([key, value]) => {
        if (value === true) {
          roles[key] = value;
        }
      });

      const isUsernameAvailable = await this.checkUserName(
        signupDetails.username,
      );
      if (!isUsernameAvailable) {
        this.isLoading = false;
        this.isButtonDisabled = false;
        return (this.error = SIGNUP_ERROR_MESSAGES.userName);
      }

      const res = this.isDevMode
        ? await this.newRegisterUser(signupDetails, roles)
        : await this.registerUser(signupDetails);
      if (res?.status === 204) {
        this.currentStep = this.LAST_STEP;
      } else {
        this.error = SIGNUP_ERROR_MESSAGES.others;
        this.isButtonDisabled = false;
      }
    } catch (error) {
      this.error = error?.message || SIGNUP_ERROR_MESSAGES.others;
      this.isButtonDisabled = false;
    } finally {
      this.isLoading = false;
    }
  }
}
