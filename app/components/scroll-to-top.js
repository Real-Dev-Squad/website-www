import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';

export default class ScrollToTopComponent extends Component {
  @service router;
  @tracked isLive = this.router.currentRoute.name === 'live';
  @tracked isScrollToTopVisible = false;

  constructor() {
    super(...arguments);

    const onBodyScroll = myDebounce(
      this,
      function () {
        if (window.scrollY !== 0) {
          this.isScrollToTopVisible = true;
        } else {
          this.isScrollToTopVisible = false;
        }
      },
      1000,
    );

    document.body.onscroll = onBodyScroll;
    document.body.addEventListener('scroll', onBodyScroll);

    registerDestructor(this, () =>
      document.body.removeEventListener('scroll', onBodyScroll),
    );
  }

  @action scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function myDebounce(context, callback, duration = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.call(context, args);
    }, duration);
  };
}
