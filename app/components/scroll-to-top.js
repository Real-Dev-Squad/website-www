import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ScrollToTopComponent extends Component {
  scrollBtn = document.getElementsByClassName('btn__scroll');

  @action scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
