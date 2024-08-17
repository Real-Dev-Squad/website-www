import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IntroController extends Controller {
  @service login;
  @service onboarding;

  @action
  async approveAction(){
    alert('Approved')
    const inviteLink = await this.onboarding.discordInvite();
    if(inviteLink) {
      window.open(`https://${inviteLink}`, '_blank');
    }
  }

  @action
  rejectAction(){
    alert('Rejected')
  }

}
