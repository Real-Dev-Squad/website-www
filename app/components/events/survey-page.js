import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';
import { MAX_CHARACTERS_DEBOUNCE_TIME } from '../../constants/live';

export default class SurveyPageComponent extends Component {
  MAX_CHARACTERS_INPUT_DELAY = MAX_CHARACTERS_DEBOUNCE_TIME;
  @tracked isMaxCharactersChecked = false;
  @tracked isAskQuestionModalOpen = false;
  @tracked maxCharacters;

  @action openAskQuestionModal() {
    console.log('opening modal');
    this.isAskQuestionModalOpen = true;
  }

  @action closeAskQuestionModal() {
    this.isAskQuestionModalOpen = false;
  }

  @action onAskQuestionButtonClick() {
    console.log('ask question api will come here!');
  }

  @action toggleMaxCharacterChecked() {
    this.isMaxCharactersChecked = !this.isMaxCharactersChecked;
  }

  @action onCharacterLimitInput(event) {
    const setMaxCharacters = () => {
      this.maxCharacters = Number(event.target.value);
      console.log(this.maxCharacters);
    };

    debounce(
      setMaxCharacters,
      this.MAX_CHARACTERS_INPUT_DELAY,
      event.target.value,
    );
  }
}
