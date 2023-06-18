import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiveController extends Controller {
  queryParams = ['dev'];
  @tracked TABS = [
    { id: 1, label: 'Screenshare', active: true },
    { id: 2, label: 'Previous Events', active: false },
    { id: 3, label: 'Real Dev Squad', active: false },
  ];
  @tracked activeTab = 'Screenshare';
  @tracked isLoading = true;
  @tracked name = '';
  @tracked isJoined = true;

  constructor() {
    super(...arguments);
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  @action inputHandler(e) {
    this.name = e.target.value;
  }

  @action clickHandler(e) {
    e.preventDefault();
    //TODO: Add funtionality to join live session
    if (this.name) {
      this.isJoined = true;
      this.name = '';
    }
  }

  @action tabHandler(tabId) {
    this.activeTab = this.TABS.find((tab) => tab.id === tabId).label;
    this.TABS = this.TABS.map((tab) =>
      tab.id === tabId ? { ...tab, active: true } : { ...tab, active: false }
    );
  }
}
