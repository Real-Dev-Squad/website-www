import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class JoinController extends Controller {
  @service router;
  @service login;
  @service featureFlag;

  queryParams = ['step', 'dev'];

  get isDevMode() {
    return this.featureFlag.isDevMode;
  }
}
