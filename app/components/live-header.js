import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiveHeaderComponent extends Component {
  @tracked TABS = [
    { label: 'Screenshare', active: true },
    { label: 'Previous Events', active: false },
    { label: 'Real Dev Squad', active: false },
  ];
  @tracked activeTab = 'Screenshare';
  @tracked isTabOpen = false;

  @action tabHandler(e) {
    const seletctedTab = e.target.textContent.trim();
    this.activeTab = seletctedTab;
    this.TABS = this.TABS.map((tab) =>
      tab.label === seletctedTab
        ? { ...tab, active: true }
        : { ...tab, active: false }
    );
  }

  @action toggleTabs() {
    this.isTabOpen = !this.isTabOpen;
  }
}
