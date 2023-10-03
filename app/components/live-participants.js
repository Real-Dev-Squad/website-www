import Component from '@glimmer/component';
import { ROLES } from '../constants/live';
import { getOwner } from '@ember/application';

export default class LiveParticipantsComponent extends Component {
  ROLES = ROLES;

  get liveService() {
    return getOwner(this).lookup('service:live');
  }

  get participantsCount() {
    let count = 0;
    let { peers, role } = this.args;
    for (let i = 0; i < peers.length; i++) {
      if (peers[i].roleName === role) {
        count++;
      }
    }
    return count;
  }
}
