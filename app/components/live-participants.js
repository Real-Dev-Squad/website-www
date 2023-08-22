import Component from '@glimmer/component';
import { ROLES } from '../constants/live';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export default class LiveParticipantsComponent extends Component {
  @tracked is
  ROLES = ROLES;
  peersLength = 1;

  get liveService() {
    return getOwner(this).lookup('service:live');
  }
}
