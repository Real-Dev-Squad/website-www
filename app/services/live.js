import Service from '@ember/service';
import {
  HMSReactiveStore,
  selectIsSomeoneScreenSharing,
  selectPeers,
  selectIsConnectedToRoom,
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
  @tracked isJoined = false;
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
    this.hmsStore.subscribe(
      (isConnected) => this.onConnection(isConnected),
      selectIsConnectedToRoom
    );
  }

  onConnection(isConnected) {
    this.isJoined = isConnected;
    console.log('Connected: ', isConnected);
  }

  async joinRoom(roomId, role, userName) {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/events/join`, {
        method: API_METHOD.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          role,
          userId: userName,
        }),
      });
      const { token } = await response.json();
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  async createRoom(userName) {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/events`, {
        method: API_METHOD.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: 'live-share-rds',
          description: 'The RDS live',
          region: 'in',
          userId: userName,
        }),
      });
      const { room_id } = await response.json();
      return room_id;
    } catch (error) {
      console.error(error);
    }
  }

  async joinSession(userName, role) {
    try {
      const roomId =
        ROLES.host === role
          ? await this.createRoom(userName)
          : '648da101fe28c9c2e9d42ea7';
      const token = await this.joinRoom(roomId, role, userName);
      // TODO: Need to refactor this logic
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
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
    const presenterTrackId = peers?.find((p) => p.roleName === ROLES.host)
      ?.auxiliaryTracks[0];
    if (presenterTrackId) {
      await this.hmsActions.attachVideo(presenterTrackId, this.videoEl);
    } else {
      await this.hmsActions.detachVideo(presenterTrackId, this.videoEl);
    }
  }
}
