import Component from '@glimmer/component';
import { heardFrom } from '../../constants/social-data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { validator } from '../../utils/validator';
import { debounce } from '@ember/runloop';
import { JOIN_DEBOUNCE_TIME, STEP_THREE_LIMITS } from '../../constants/join';

export default class StepThreeComponent extends Component {
  @tracked data = JSON.parse(localStorage.getItem('stepThreeData')) ?? {
    whyRds: '',
    foundFrom: '',
    numberOfHours: '',
  };

  @tracked errorMessage = {
    whyRds: '',
    foundFrom: '',
    numberOfHours: '',
  };

  isValid;
  setIsValid;
  setIsPreValid;
  heardFrom = heardFrom;

  constructor(...args) {
    super(...args);
    this.isValid = this.args.isValid;
    this.setIsValid = this.args.setIsValid;
    this.setIsPreValid = this.args.setIsPreValid;

    const validated = this.isDataValid();
    localStorage.setItem('isValid', validated);
    this.setIsPreValid(validated);
  }

  isDataValid() {
    const isWhyRdsValid = validator(
      this.data.whyRds,
      STEP_THREE_LIMITS.word.whyRds
    );
    const isFoundFromValid = validator(
      this.data.foundFrom,
      STEP_THREE_LIMITS.word.foundFrom
    );
    const isNumberOfHoursValid =
      parseInt(this.data.numberOfHours) >=
        STEP_THREE_LIMITS.hour.numberOfHours.min &&
      parseInt(this.data.numberOfHours) <=
        STEP_THREE_LIMITS.hour.numberOfHours.max;
    return (
      isWhyRdsValid.isValid && isFoundFromValid.isValid && isNumberOfHoursValid
    );
  }

  @action inputHandler(e) {
    this.setIsPreValid(false);

    const setValToLocalStorage = () => {
      let inputValue = e.target.value;
      if (e.target.name === 'numberOfHours') {
        inputValue = parseInt(inputValue);
      }
      this.data = { ...this.data, [e.target.name]: inputValue };
      localStorage.setItem('stepThreeData', JSON.stringify(this.data));

      // Only validate the changed field
      const field = e.target.name;
      if (field !== 'numberOfHours') {
        const { isValid, remainingWords } = validator(
          this.data[field],
          STEP_THREE_LIMITS.word[field]
        );
        this.errorMessage = {
          ...this.errorMessage,
          [field]: isValid
            ? ''
            : `At least ${remainingWords} more word(s) required`,
        };
      } else if (
        field === 'numberOfHours' &&
        (inputValue < STEP_THREE_LIMITS.hour.numberOfHours.min ||
          inputValue > STEP_THREE_LIMITS.hour.numberOfHours.max)
      ) {
        this.errorMessage = {
          ...this.errorMessage,
          [field]: `Enter value between ${STEP_THREE_LIMITS.hour.numberOfHours.min}-${STEP_THREE_LIMITS.hour.numberOfHours.max}`,
        };
      } else {
        this.errorMessage = {
          ...this.errorMessage,
          [field]: '',
        };
      }

      const isAllValid = this.isDataValid();
      this.setIsValid(isAllValid);
      localStorage.setItem('isValid', isAllValid);
    };

    debounce(this.data, setValToLocalStorage, JOIN_DEBOUNCE_TIME);
  }
}
