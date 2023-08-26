import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { ROLES } from '../constants/live';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

export default class LiveHeaderComponent extends Component {
  @service live;
  @tracked isSideBarOpen = false;
  ROLES = ROLES;
  constructor(...args) {
    super(...args);
  }

  @action toggleMobileSidebar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  get liveService() {
    return getOwner(this).lookup('service:live');
  }
}
