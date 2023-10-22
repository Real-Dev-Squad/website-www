import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { globalRef } from 'ember-ref-bucket';
import { ROLES, BUTTONS_TYPE } from '../constants/live';
import { TOAST_OPTIONS } from '../constants/toast-options';
export default class LiveController extends Controller {
  queryParams = ['dev'];
  ROLES = ROLES;
  @service login;
  @service toast;
  @tracked TABS = [
    { id: 1, label: 'Screenshare', active: true },
    { id: 2, label: 'Previous Events', active: false },
    { id: 3, label: 'Real Dev Squad', active: false },
    // TODO: uncomment this line when logs feature is integrated with API
    { id: 4, label: 'Logs', active: false },
  ];
  @tracked activeTab = 'Screenshare';
  @tracked isLoading = false;
  @tracked name = '';
  @tracked role = '';
  @tracked roomCode = '';
  @tracked isCopied = false;
  @tracked isKickoutModalOpen = false;
  @tracked isRoomCodeModalOpen = false;
  @tracked isWarningModalOpen = false;
  @tracked peerToRemove = '';
  @tracked newRoomCode = '';
  @tracked isActiveEventFound;
  @tracked buttonText = '';
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

  @action async clickHandler(e) {
    e.preventDefault();
    const isValidRole = Object.keys(ROLES).includes(this.role);
    const canJoin =
      this.role === this.ROLES.maven
        ? this.name && this.roomCode && isValidRole
        : this.name && isValidRole;

    if (!canJoin) return;

    const activeEventsdata = await this.liveService.getActiveEvents();
    const activeEvent = this.isActiveEventFound && activeEventsdata?.[0];

    if (this.isActiveEventFound) {
      const roomId = activeEvent?.room_id;
      this.liveService.joinSession(roomId, this.name, this.role, this.roomCode);
    } else {
      if (this.role !== ROLES.host)
        return this.toast.info(
          'No active event found!',
          'Info!',
          TOAST_OPTIONS
        );

      const roomId = await this.liveService.createRoom(this.name);
      this.liveService.joinSession(roomId, this.name, this.role, this.roomCode);
    }

    this.name = '';
    this.roomCode = '';
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
    this.isWarningModalOpen = false;
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

  @action toggleWarningModal() {
    this.isWarningModalOpen = !this.isWarningModalOpen;
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

  @action async selectRoleHandler(selectedRole) {
    this.role = selectedRole;

    const activeEventData = await this.liveService.getActiveEvents();
    const isActiveEvent = Boolean(activeEventData?.[0]?.enabled);
    this.isActiveEventFound = isActiveEvent;

    if (!activeEventData && selectedRole === ROLES.host) {
      this.buttonText = 'Create Event';
    } else if (activeEventData) {
      this.buttonText = 'Join';
    } else {
      this.buttonText = 'Join';
    }
  }

  @action createRoomCodeHandler(value, event) {
    event.preventDefault();
    if (value) {
      this.liveService.roomCodesHandler(value);
      this.newRoomCode = '';
    }
  }
}
