import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class ApplicationRoute extends Route {
  @service router;
  @service toast;

  showToast(transition) {
    this.toast.error(transition.to.queryParams.error, 'Error', TOAST_OPTIONS);
  }

  beforeModel(transition) {
    if (
      transition?.to?.queryParams?.dev === 'true' &&
      transition?.to?.queryParams?.error
    ) {
      if (transition?.to?.queryParams?.error !== '') {
        this.showToast(transition);
      }
    }
  }
}
