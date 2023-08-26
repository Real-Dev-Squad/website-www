import Component from '@glimmer/component';
import { ROLES } from '../constants/live';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

export default class LiveParticipantsComponent extends Component {
  @service live;
  ROLES = ROLES;

  get liveService() {
    return getOwner(this).lookup('service:live');
  }
}
