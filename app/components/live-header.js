import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiveHeaderComponent extends Component {
  @tracked TABS = [
    { label: 'Screenshare', active: true },
    { label: 'Previous Events', active: false },
    { label: 'Real Dev Squad', active: false },
  ];

  @action tabHandler(e) {
    const activeTab = e.target.textContent.trim();
    this.TABS = this.TABS.map((tab) =>
      tab.label === activeTab
        ? { ...tab, active: true }
        : { ...tab, active: false }
    );
  }
}
