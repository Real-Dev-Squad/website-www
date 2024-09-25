import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class SubscribeController extends Controller {
  queryParams = ['dev'];
  @service login;
  @tracked modelOpen = true;
  @tracked isFormOpen = false;
  get isDevMode() {
    return this.featureFlag.isDevMode;
  }

  get isLoggedIn() {
    return this.login.isLoggedIn && this.login.userData;
  }

  @action toggleFormModal() {
    this.isFormOpen = !this.isFormOpen;
  }
  @action toggleModalOpen() {
    console.log('hello');
    console.log(this.modelOpen);
    this.modelOpen = !this.modelOpen;
  }

  @action
  handleSubmit(event) {
    event.preventDefault();
    alert('Form submitted!');
    this.toggleFormModal();
  }
}
