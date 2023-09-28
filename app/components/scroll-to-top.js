import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { tracked } from '@glimmer/tracking';
export default class ScrollToTopComponent extends Component {
  @service router;
  @tracked isLive = this.router.currentRoute.name === 'live';

  constructor(...args) {
    super(...args);
    console.log(this.isLive);
  }

  @action scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
