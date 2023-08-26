import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { ANKUSH_TWITTER } from '../constants/urls';

export default class ArchivedController extends Controller {
  ANKUSH_TWITTER = ANKUSH_TWITTER;
  @service login;
  @service router;
  constructor() {
    super(...arguments);
    console.log('archived', this.login.userData.roles);
    if (this.login.userData.roles.archived) {
      this.router.transitionTo(`archived`);
    }
  }
}
