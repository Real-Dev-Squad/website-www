import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { TOAST_OPTIONS } from '../constants/toast-options';
import { APPS } from '../constants/urls';
import {
  ANSWER_STATUS,
  API_METHOD,
  PATCH_API_CONFIGS,
} from '../constants/live';

export default class SurveyService extends Service {
  @service router;
  @service toast;
  @tracked answers;
  @tracked approvedAnswers;
  @tracked recentQuestion;

  setApprovedAnswers(approvedAnswers) {
    this.approvedAnswers = approvedAnswers;
  }

  setAnswers(answers) {
    this.answers = answers;
  }

  setRecentQuestion(question) {
    this.recentQuestion = question;
  }

  async answerSubmitHandler(payload) {
    let error = null,
      answer = null;

    try {
      const answerResponse = await fetch(`${APPS.API_BACKEND}/answers`, {
        method: API_METHOD.POST,
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(payload),
      });
      answer = await answerResponse.json();

      if (!answerResponse.ok)
        return this.toast.error(answer.message, answer.error, TOAST_OPTIONS);

      this.toast.success(answer.message, answer.error, TOAST_OPTIONS);

      return { error: error, result: answer };
    } catch (error) {
      console.error('Error while submitting answer: ', error);
      return { error: error, result: null };
    }
  }
  async answerApproveHandler(id) {
    const approvalPayload = {
      status: ANSWER_STATUS.APPROVED,
    };

    try {
      const approveResponse = await fetch(`${APPS.API_BACKEND}/answers/${id}`, {
        ...PATCH_API_CONFIGS,
        body: JSON.stringify(approvalPayload),
      });

      if (!approveResponse.ok) return; //TODO add toast here

      this.toast.success(
        'Answer approved successfully',
        'Success',
        TOAST_OPTIONS,
      );
    } catch (error) {
      console.error('Error while approving answer: ', error);
    }
  }

  async answerRejectHandler(id) {
    const rejectionPayload = {
      status: ANSWER_STATUS.REJECTED,
    };
    try {
      const rejectResponse = await fetch(`${APPS.API_BACKEND}/answers/${id}`, {
        ...PATCH_API_CONFIGS,
        body: JSON.stringify(rejectionPayload),
      });

      if (!rejectResponse.ok) return; //TODO add toast here

      this.toast.success(
        'Answer rejected successfully',
        'Success',
        TOAST_OPTIONS,
      );
    } catch (error) {
      console.error('Error while rejecting answer: ', error);
    }
  }
}
