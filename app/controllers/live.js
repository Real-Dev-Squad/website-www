import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { globalRef } from 'ember-ref-bucket';
import { ROLES, BUTTONS_TYPE } from '../constants/live';
export default class LiveController extends Controller {
  queryParams = ['dev'];
  ROLES = ROLES;
  @service login;
  @tracked TABS = [
    { id: 1, label: 'Screenshare', active: true },
    { id: 2, label: 'Previous Events', active: false },
    { id: 3, label: 'Real Dev Squad', active: false },
  ];
  @tracked activeTab = 'Screenshare';
  @tracked isLoading = false;
  @tracked name = '';
  @tracked role = '';
  @tracked roomCode = '';
  @tracked isCopied = false;
  @tracked isKickoutModalOpen = false;
  @tracked isRoomCodeModalOpen = false;
  @tracked peerToRemove = '';
  @tracked newRoomCode = '';
  @globalRef('videoEl') videoEl;
  get liveService() {
    return getOwner(this).lookup('service:live');
  }

  constructor() {
    super(...arguments);
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  @action inputHandler(type, event) {
    const updatedValue = event.target.value;
    switch (type) {
      case 'name':
        this.name = updatedValue;
        break;
      case 'roomCode':
        this.roomCode = updatedValue;
        break;
      case 'newRoomCode':
        this.newRoomCode = updatedValue;
        break;
      default:
        console.error('No matching type');
    }
  }

  @action clickHandler(e) {
    e.preventDefault();
    const isValidRole = Object.keys(ROLES).includes(this.role);
    const canJoin =
      this.role === this.ROLES.maven
        ? this.name && this.roomCode && isValidRole
        : this.name && isValidRole;

    if (canJoin) {
      this.liveService.joinSession(this.name, this.role, this.roomCode);
      this.name = '';
      this.roomCode = '';
    }
  }

  @action backHandler() {
    this.role = '';
    this.name = '';
    this.roomCode = '';
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

  @action toggleRoomCodeModal() {
    this.isRoomCodeModalOpen = !this.isRoomCodeModalOpen;
  }

  @action buttonClickHandler(buttonId) {
    switch (buttonId) {
      case BUTTONS_TYPE.SCREEN_SHARE:
        this.screenShare();
        break;
      case BUTTONS_TYPE.LEAVE_ROOM:
        this.leaveSession();
        break;
      default:
        console.error('No matching type');
    }
  }

  @action selectRoleHandler(selectedRole) {
    this.role = selectedRole;
  }

  @action createRoomCodeHandler(value, event) {
    event.preventDefault();
    if (value) {
      this.liveService.roomCodesHandler(value);
      this.newRoomCode = '';
    }
  }
}
