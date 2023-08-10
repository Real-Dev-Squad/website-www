import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { globalRef } from 'ember-ref-bucket';
import { ROLES, BUTTONS_TYPE } from '../constants/live';
export default class LiveController extends Controller {
  queryParams = ['dev', 'role', 'room'];
  @service login;
  @tracked TABS = [
    { id: 1, label: 'Screenshare', active: true },
    { id: 2, label: 'Previous Events', active: false },
    { id: 3, label: 'Real Dev Squad', active: false },
  ];
  @tracked activeTab = 'Screenshare';
  @tracked isLoading = false;
  @tracked name = '';
  @tracked role = null;
  @tracked room = null;
  @tracked isCopied = false;
  @tracked isKickoutModalOpen = true;
  @tracked peerToRemove = '';
  @globalRef('videoEl') videoEl;
  get liveService() {
    return getOwner(this).lookup('service:live');
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

  @action async copyInviteLink() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/live?dev=true&role=guest&room=${this.liveService.activeRoomId}`
      );
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    } catch (error) {
      this.isCopied = false;
      console.error(error);
    }
  }

  @action removePeer() {
    this.liveService.removePeer(this.peerToRemove?.id);
    this.isKickoutModalOpen = false;
  }

  @action openKickoutModal(peer) {
    this.isKickoutModalOpen = true;
    this.peerToRemove = peer;
  }

  @action closeKickoutModal() {
    this.isKickoutModalOpen = false;
    this.peerToRemove = '';
  }

  @action buttonClickHandler(buttonId) {
    switch (buttonId) {
      case BUTTONS_TYPE.SCREEN_SHARE:
        this.screenShare();
        break;
      case BUTTONS_TYPE.COPY_LINK:
        this.copyInviteLink();
        break;
      case BUTTONS_TYPE.LEAVE_ROOM:
        this.leaveSession();
        break;
      default:
        console.error('Illegal state');
    }
  }
}
