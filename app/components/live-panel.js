import Component from '@glimmer/component';
import { PANEL_BUTTON } from '../constants/live-panel-data';
import { action } from '@ember/object';

export default class LivePanelComponent extends Component {
  BUTTON_MAPPING = PANEL_BUTTON;

  @action buttonClickHandler(buttonId) {
    // TODO: remove console.log
    console.log(buttonId);
  }

  @action startLiveHandler() {
    // TODO: remove console.log
    console.log('Starting....');
  }
}
