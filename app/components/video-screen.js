import Component from '@glimmer/component';
import { getOwner } from '@ember/application';

export default class VideoScreen extends Component {
  get liveService() {
    return getOwner(this).lookup('service:live');
  }
}
