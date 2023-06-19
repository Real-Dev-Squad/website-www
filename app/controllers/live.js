import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { globalRef } from 'ember-ref-bucket';
import { ROLES } from '../constants/live';

export default class LiveController extends Controller {
  queryParams = ['dev', 'role', 'room'];
  @service login;
  @tracked TABS = [
    { id: 1, label: 'Screenshare', active: true },
    { id: 2, label: 'Previous Events', active: false },
    { id: 3, label: 'Real Dev Squad', active: false },
  ];
  @tracked activeTab = 'Screenshare';
  @tracked isLoading = true;
  @tracked name = '';
  @tracked role = null;
  @tracked room = null;
  @globalRef('videoEl') videoEl;
  get liveService() {
    return getOwner(this).lookup('service:live');
  }

  constructor() {
    super(...arguments);
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

  @action inputHandler(e) {
    this.name = e.target.value;
  }

  @action clickHandler(e) {
    e.preventDefault();
    const isGuest = this.role === ROLES.guest;
    const isHost = this.role === ROLES.host;
    if (this.name && (isGuest || isHost)) {
      this.liveService.joinSession(this.name, this.role, this.room);
      this.name = '';
    }
  }

  @action tabHandler(tabId) {
    this.activeTab = this.TABS.find((tab) => tab.id === tabId).label;
    this.TABS = this.TABS.map((tab) =>
      tab.id === tabId ? { ...tab, active: true } : { ...tab, active: false }
    );
  }

  @action leaveSession() {
    this.liveService.leaveSession(this.role);
  }

  @action screenShare() {
    this.liveService.shareScreen();
  }
}
