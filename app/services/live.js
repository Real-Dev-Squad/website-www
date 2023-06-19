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
  hmsManager;
  hmsStore;
  hmsActions;
  @tracked isScreenShareOn = false;
  @tracked isJoined = false;
  @tracked activeRoomId = '';
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
          name: `live-rds-${Math.random()}`,
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

  async endRoom(roomId) {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/events/end`, {
        method: API_METHOD.PATCH,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id: roomId,
          reason: 'Session is over',
          lock: true,
        }),
      });
      const { message } = await response.json();
      return message;
    } catch (error) {
      console.error(error);
    }
  }

  async joinSession(userName, role, room) {
    try {
      const roomId =
        ROLES.host === role ? await this.createRoom(userName) : room;
      console.log({ roomId }); // For now use it to create link for guest
      this.activeRoomId = roomId;
      const token = await this.joinRoom(roomId, role, userName);
      await this.hmsActions.join({
        userName,
        authToken: token,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async leaveSession(role) {
    try {
      if (ROLES.host === role) {
        await this.endRoom(this.activeRoomId);
      } else {
        await this.hmsActions.leave();
      }
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
