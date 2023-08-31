import Component from '@glimmer/component';
import { ROLES } from '../constants/live';
import { getOwner } from '@ember/application';

export default class LiveParticipantsComponent extends Component {
  ROLES = ROLES;

  get liveService() {
    return getOwner(this).lookup('service:live');
  }
}
