import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubscribeRoute extends Route {
  @service login;
}
