import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IdentityController extends Controller {
  @service login;

  @tracked userData = null;
  @tracked state = 'getStarted';
  @tracked profileURL = null;

  constructor() {
    super(...arguments);
    this.userData = this.login.userData;
    this.state = this.initialState;
    this.profileURL = this.userData?.profileURL;
  }

  get initialState() {
    if (this.userData?.profileStatus === 'PENDING') {
      return 'reload';
    } else if (this.userData?.profileStatus === 'VERIFIED') {
      return 'verified';
    } else if (this.userData?.profileStatus === 'BLOCKED') {
      return 'blocked';
    }
    return 'getStarted';
  }

  @action
  setState(newState) {
    this.state = newState;
  }
}
