import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { EVENTS_CATEGORIES } from '../constants/events-data';

export default class EventsComponent extends Component {
  @service router;
  EVENTS_CATEGORIES = EVENTS_CATEGORIES;

  get isDev() {
    if (this.router.currentRoute) {
      return this.router.currentRoute.queryParams.dev;
    }
    return false;
  }
}
