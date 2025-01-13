import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { TOAST_OPTIONS } from '../constants/toast-options';
import { AUTH } from '../constants/urls';
import redirectAuth from '../utils/redirect-auth';
export default class IdentityRoute extends Route {
  @service router;
  @service login;
  @service toast;
  @service fastboot;

  beforeModel(transition) {

    if (transition?.to?.queryParams?.dev !== 'true') {
      this.router.transitionTo('/page-not-found');
    }

    // this is not working 
    // if(!this.login.isLoggedIn){
    //   this.toast.error('You must be logged in to access this page.', '', TOAST_OPTIONS);
    //   setTimeout(redirectAuth, 2000);
    //   return;
    // }

    // another solution is an redirect it to login page 

  }
  // async model(){
  // if (!this.fastboot.isFastBoot && !this.isRedirecting) {
  //   this.isRedirecting = true;
  //   setTimeout(() => {
  //     redirectAuth();
  //     this.isRedirecting = false;
  //   }, 2000)
  // }
  // }
}

