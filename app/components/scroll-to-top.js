import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ScrollToTopComponent extends Component {
  @action scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
