import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { RDS_TWITTER, JS_TS_DISCORD_URL, APPS } from '../constants/urls';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class SubscribeController extends Controller {
  @service login;
  @tracked isFormOpen = false;
  @tracked email = '';
  @tracked phone = '';
  @tracked userData = null;
  @tracked isLoading = false;
  @tracked isSubscribed = false;
  @tracked showSubscriptionModal = false;

  RDS_TWITTER = RDS_TWITTER;
  JS_TS_DISCORD_URL = JS_TS_DISCORD_URL;

  constructor() {
    console.log('Constructor called');
    super(...arguments);
    this.userData = this.login.userData;
    if (this.isLoggedIn && this.userData?.isSubscribed) {
      console.log("testing")
      this.isSubscribed = true;
    }
    console.log('Constructor ended');
  }

  get isLoggedIn() {
    return this.login.isLoggedIn;
  }

  get isSubmitDisabled() {
    return !this.email || !/^\+91\d{10}$/.test(this.phone);
  }

  @action
  toggleFormModal() {
    this.isFormOpen = !this.isFormOpen;
  }

  @action
  toggleSubscriptionModal() {
    this.showSubscriptionModal = !this.showSubscriptionModal;
  }

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePhone(event) {
    const input = event.target.value;
    this.phone = input.replace(/[^\d+]/g, '');
  }

  @action
  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isSubmitDisabled) {
      this.isLoading = true;
      try {
        console.log('Form submitted with:', {
          email: this.email,
          phone: this.phone,
        });
        const url = `${APPS.API_BACKEND}/subscription?dev=true`;
        console.log('URL:', url);
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: this.email,
            phoneNumber: this.phone,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          this.toast.error(
            'Something went wrong. Please try again.',
            '',
            TOAST_OPTIONS,
          );
        } else {
          this.isSubscribed = true;
          this.toast.info('🎉 Thank you for subscribing!', '', TOAST_OPTIONS);
          this.showSubscriptionModal = true;
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isLoading = false;
      }
      this.toggleFormModal();
      this.email = '';
      this.phone = '';
    }
  }

  
}
