import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IntroController extends Controller {
  @service login;

  @action
  async approveAction() {
    try {
      const response = await fetch(
        `https://api.realdevsquad.com/discord-actions/invite`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (response.ok) {
        const result = await response.json();
        const inviteLink = result.inviteLink;

        this.model.inviteLink = inviteLink;

        alert('User approved and invite link generated.');
      } else {
        const errorData = await response.json();
        alert(`Failed to generate invite link: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error generating invite link:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  @action
  copyToClipboard(link) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Invite link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy the text: ', err);
      });
  }

  @action
  rejectAction() {
    alert('Rejected');
    //  logic for rejection
  }
}
