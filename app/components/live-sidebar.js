import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { ROLES } from '../constants/live';
import { getOwner } from '@ember/application';

export default class LiveHeaderComponent extends Component {
  @tracked isSideBarOpen = false;
  ROLES = ROLES;

  @action toggleMobileSidebar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  get liveService() {
    return getOwner(this).lookup('service:live');
  }
}
