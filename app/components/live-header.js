import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LiveHeaderComponent extends Component {
  @service live;
  @service featureFlag;
  @tracked isTabOpen = false;

  get isWordCloudFeatureOn() {
    return this.featureFlag.isWordCloud;
  }

  @action toggleTabs() {
    this.isTabOpen = !this.isTabOpen;
  }
}
