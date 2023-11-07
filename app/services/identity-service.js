import Service from '@ember/service';

export default class IdentityServiceService extends Service {
  reload() {
    window.location.reload();
  }
}
