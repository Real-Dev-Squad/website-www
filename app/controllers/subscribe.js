// import Controller from '@ember/controller';
// import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';
// import { inject as service } from '@ember/service';
// import { RDS_TWITTER, APPS } from '../constants/urls';
// import { TOAST_OPTIONS } from '../constants/toast-options';

// export default class SubscribeController extends Controller {
//   @service login;
//   @tracked isFormOpen = false;
//   @tracked email = '';
//   @tracked phone = '';
//   @tracked userData = null;
//   @tracked isLoading = false;
//   @tracked showSubscriptionConfirmation = false;

//   RDS_TWITTER = RDS_TWITTER;

//   constructor() {
//     super(...arguments);
//     this.userData = this.login.userData;
//   }

//   get isLoggedIn() {
//     return this.login.isLoggedIn;
//   }

//   get isSubscribed() {
//     return this.login.userData.isSubscribed;
//   }

//   get isSubmitDisabled() {
//     return !this.email || (this.phone && !/^\+?\d*$/.test(this.phone));
//   }

//   @action
//   toggleFormModal() {
//     this.isFormOpen = !this.isFormOpen;
//   }

//   @action
//   updateEmail(event) {
//     this.email = event.target.value;
//   }

//   @action
//   updatePhone(event) {
//     const input = event.target.value;
//     const isValidPhone = /^\+?\d*$/.test(input);
//     if (isValidPhone) {
//       this.phone = input;
//     }
//   }

//   @action
//   async handleSubmit(event) {
//     event.preventDefault();
//     if (!this.isSubmitDisabled) {
//       this.isLoading = true;
//       try {
//         const url = `${APPS.API_BACKEND}/subscription?dev=true`;
//         const response = await fetch(url, {
//           method: 'POST',
//           body: JSON.stringify({
//             email: this.email,
//             phoneNumber: this.phone,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });
//         if (!response.ok) {
//           this.toast.error(
//             'Something went wrong. Please try again.',
//             '',
//             TOAST_OPTIONS,
//           );
//         } else {
//           this.login.userData.isSubscribed = true;
//           this.isFormOpen = false;
//           this.showSubscriptionConfirmation = true;
//           this.toast.info('🎉 Thank you for subscribing!', '', TOAST_OPTIONS);
//         }
//       } catch (error) {
//         console.log(error);
//         this.toast.error(
//           `Something went wrong. ${error.message}`,
//           '',
//           TOAST_OPTIONS,
//         );
//       } finally {
//         this.isLoading = false;
//       }
//       this.email = '';
//       this.phone = '';
//     }
//   }
// }

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { RDS_TWITTER, APPS } from '../constants/urls';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class SubscribeController extends Controller {
  @service login;
  @tracked isFormOpen = false;
  @tracked email = '';
  @tracked phone = '';
  @tracked userData = null;
  @tracked isLoading = false;
  @tracked showSubscribedMessage = false;

  RDS_TWITTER = RDS_TWITTER;

  constructor() {
    super(...arguments);
    this.userData = this.login.userData;
  }

  get isLoggedIn() {
    return this.login.isLoggedIn;
  }

  get isSubscribed() {
    return this.login.userData.isSubscribed;
  }

  get isSubmitDisabled() {
    return !this.email || (this.phone && !/^\+?\d*$/.test(this.phone));
  }

  @action
  toggleFormModal() {
    this.isFormOpen = !this.isFormOpen;
  }

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePhone(event) {
    const input = event.target.value;
    const isValidPhone = /^\+?\d*$/.test(input);
    if (isValidPhone) {
      this.phone = input;
    }
  }

  @action
  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isSubmitDisabled) {
      this.isLoading = true;
      try {
        const url = `${APPS.API_BACKEND}/subscription?dev=true`;
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
          this.login.userData.isSubscribed = true;
          this.isFormOpen = false;
          this.showSubscribedMessage = true;
          this.toast.info('🎉 You are already subscribed!', '', TOAST_OPTIONS);
        }
      } catch (error) {
        console.log(error);
        this.toast.error(
          `Something went wrong. ${error.message}`,
          '',
          TOAST_OPTIONS,
        );
      } finally {
        this.isLoading = false;
      }
      this.email = '';
      this.phone = '';
    }
  }
}
