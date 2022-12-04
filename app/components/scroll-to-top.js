import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ScrollToTopComponent extends Component {
  scrollBtn = document.getElementsByClassName('btn__scroll');

  @action scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @action scrollPosition() {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        this.scrollBtn.style.bottom = '20px';
      } else {
        this.scrollBtn.style.bottom = '-100px';
      }
    };
  }
}
