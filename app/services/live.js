import Service from '@ember/service';
import {
  HMSReactiveStore,
  selectIsSomeoneScreenSharing,
  selectPeers,
} from '@100mslive/hms-video-store';
import { tracked } from '@glimmer/tracking';
import ENV from 'website-www/config/environment';
import { globalRef } from 'ember-ref-bucket';
import { ROLES, API_METHOD } from '../constants/live';

export default class LiveService extends Service {
  BASE_ENDPOINT = ENV.BASE_100MS_URL;
  hmsManager;
  hmsStore;
  hmsActions;
  @tracked isScreenShareOn = false;
  @globalRef('videoEl') videoEl;

  constructor() {
    super(...arguments);
    // Initialize HMS store
    this.hmsManager = new HMSReactiveStore();
    this.hmsManager.triggerOnSubscribe();
    this.hmsStore = this.hmsManager.getStore();
    this.hmsActions = this.hmsManager.getActions();
    this.hmsStore.subscribe(
      (peers) => this.renderScreenVideoToPeers(peers, this.hmsActions),
      selectPeers
    );
  }

  async getToken(userName, userType) {
    try {
      //TODO: Add funtionality to join live session with BE APIs
      const response = await fetch(`${this.BASE_ENDPOINT}/api/token`, {
        method: API_METHOD.POST,
        body: JSON.stringify({
          room_id: ENV.ROOM_ID,
          role: userType === ROLES.guest ? ROLES.guest : ROLES.presenter,
          user_id: userName,
        }),
      });
      const { token } = await response.json();
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  async joinSession(userName, userType) {
    try {
      const token = await this.getToken(userName, userType);
      await this.hmsActions.join({
        userName,
        authToken: token,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async leaveSession() {
    try {
      await this.hmsActions.leave();
    } catch (error) {
      console.error(error);
    }
  }

  async shareScreen() {
    try {
      const screenShareOn = !this.hmsStore.getState(
        selectIsSomeoneScreenSharing
      );
      await this.hmsActions.setScreenShareEnabled(screenShareOn);
      this.isScreenShareOn = screenShareOn;
    } catch (error) {
      console.error(error);
    }
  }

  async renderScreenVideoToPeers(peers) {
    const presenterTrackId = peers?.find((p) => p.roleName === 'presenter')
      ?.auxiliaryTracks[0];
    if (presenterTrackId) {
      await this.hmsActions.attachVideo(presenterTrackId, this.videoEl);
    } else {
      await this.hmsActions.detachVideo(presenterTrackId, this.videoEl);
    }
  }
}
