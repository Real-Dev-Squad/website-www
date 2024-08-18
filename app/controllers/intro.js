import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IntroController extends Controller {
  @service login;

  @tracked rejectionNote = localStorage.getItem('rejectionNote') || '';
  @tracked isRejected = localStorage.getItem('isRejected') === 'true';

  @action
  async approveAction() {
    const userId = this.model.userId;

    if (!userId) {
      alert('User ID is missing. Unable to generate invite link.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.realdevsquad.com/discord/invites?userId=${userId}`,
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
      } else if (response.status === 409) {
        alert('Invite link is already present for this user.');
      } else if (response.status === 403 || response.status === 404) {
        const errorData = await response.json();
        alert(`Failed to generate invite link: ${errorData.message}`);
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
    const feedbackNote = document.querySelector('.comment-box').value.trim();
    this.rejectionNote = feedbackNote;
    this.isRejected = true;

    // Store in local storage
    localStorage.setItem('rejectionNote', feedbackNote);
    localStorage.setItem('isRejected', 'true');
  }
}
