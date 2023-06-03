import Service from '@ember/service';
import { HMSReactiveStore } from '@100mslive/hms-video-store';
import ENV from 'website-www/config/environment';

export default class LiveService extends Service {
  BASE_ENDPOINT = ENV.BASE_100MS_URL;
  hmsManager = new HMSReactiveStore();
  hmsStore = this.hmsManager.getStore();
  hmsActions = this.hmsManager.getActions();

  constructor() {
    super(...arguments);
    // Initialize HMS store
    this.hmsManager.triggerOnSubscribe();
  }

  async getToken(userName, userType) {
    try {
      //TODO: Add funtionality to join live session with BE APIs
      const response = await fetch(`${this.BASE_ENDPOINT}/api/token`, {
        method: 'POST',
        body: JSON.stringify({
          room_id: ENV.ROOM_ID,
          role: userType === 'guest' ? 'guest' : 'presenter',
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
      this.hmsActions.join({
        userName,
        authToken: token,
      });
    } catch (error) {
      console.error(error);
    }
  }

  leaveSession() {
    try {
      this.hmsActions.leave();
    } catch (error) {
      console.error(error);
    }
  }
}
