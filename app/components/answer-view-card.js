import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { readMoreFormatter } from '../utils/common-utils';
import { action } from '@ember/object';
import { ANSWER_STATUS } from '../constants/live';

const maxCharactersToShow = 70;
export default class AnswerViewCardComponent extends Component {
  @tracked answerText = readMoreFormatter(
    this.args.answerObject.answer,
    maxCharactersToShow,
  );

  @tracked isTextMoreThanMaxCharacters =
    this.args.answerObject.answer?.length > maxCharactersToShow;
  @tracked isReadMoreEnabled = false;
  @tracked readMoreOrLessText = this.isReadMoreEnabled ? 'Less' : 'More';
  @tracked isApproved =
    this.args.answerObject.status === ANSWER_STATUS.APPROVED;
  @tracked isPending = this.args.answerObject.status === ANSWER_STATUS.PENDING;
  @tracked isRejected =
    this.args.answerObject.status === ANSWER_STATUS.REJECTED;

  @action toggleReadMore() {
    this.isReadMoreEnabled = !this.isReadMoreEnabled;
    this.readMoreOrLessText = this.isReadMoreEnabled ? 'Less' : 'More';
    if (this.isReadMoreEnabled) {
      this.answerText = this.args.answerObject.answer;
    } else {
      this.answerText = readMoreFormatter(
        this.args.answerObject.answer,
        maxCharactersToShow,
      );
    }
  }
}
