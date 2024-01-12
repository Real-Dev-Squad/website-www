import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click, typeIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
class MockSurveyService extends Service {
  recentQuestion = {
    id: 'demo-question-id',
    question: 'This is mock recent question',
  };
}
module('Integration | Component | answer-reply-modal', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    // Registering the mock survey service
    this.owner.register('service:survey', MockSurveyService);
    const surveyService = this.owner.lookup('service:survey');

    this.setProperties({
      openModal: () => assert.step('openModal triggered'),
      closeModal: () => assert.step('closeModal triggered'),
      isOpen: true,
      inputHandler: () => assert.step('inputHandler triggered'),
      answerValue: 'mock answer value',
      onSubmit: () => assert.step('onSubmit triggered'),
      validationDetails: {
        isError: false,
        isHelperTextVisible: true,
        helperText: `Minimum character limit is 10 characters`,
      },
      submitButtonState: {
        isDisabled: true,
        isLoading: false,
      },
      survey: surveyService,
    });
  });

  test('it renders', async function (assert) {
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    assert.dom('[data-test-answer-reply-modal]').exists();
    assert.dom('[data-test-answer-reply-modal="heading"]').exists();
    assert.dom('[data-test-answer-reply-modal="info-text"]').exists();
    assert.dom('[data-test-answer-reply-modal="info-icon"]').exists();
    assert.dom('[data-test-answer-reply-modal="actions"]').exists();

    // for input box
    assert.dom('[data-test-input]').exists();
    assert.dom('[data-test-label]').exists();
    assert.dom('[data-test-required]').exists();
    assert.dom('[data-test-input-field]').exists();
    assert.dom('[data-test-input-helper-text]').exists();

    // for button
    assert.dom('[data-test-button="answer-reply-modal-cancel"]').exists();
    assert.dom('[data-test-button="answer-reply-modal-submit"]').exists();
  });

  test('it should trigger closeModal function on click of close button', async function (assert) {
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    await click('[data-test-button="answer-reply-modal-cancel"]');

    assert.verifySteps(['closeModal triggered'], 'closeModal working fine!');
  });

  test('it should trigger onSubmit function on click of submit button if submitButtonState.isisDisabled is false', async function (assert) {
    this.set('submitButtonState', {
      isDisabled: false,
      isLoading: false,
    });
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    await click('[data-test-button="answer-reply-modal-submit"]');
    assert.verifySteps(['onSubmit triggered'], 'onSubmit working fine!');
  });

  test('it should render button disabled when submitButtonState.isDisabled is true and not disabled if submitButtonState.isDisabled is false', async function (assert) {
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    assert.dom('[data-test-button="answer-reply-modal-submit"]').isDisabled();

    this.set('submitButtonState', {
      isDisabled: false,
      isLoading: false,
    });

    assert
      .dom('[data-test-button="answer-reply-modal-submit"]')
      .isNotDisabled();
  });

  test('it should render button loader when submitButtonState.isLoading is true and shouldn\t render if submitButtonState.isLoading is false', async function (assert) {
    this.set('submitButtonState', {
      isDisabled: false,
      isLoading: true,
    });
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    assert.dom('[data-test-button-loader]').exists();

    this.set('submitButtonState', {
      isDisabled: false,
      isLoading: false,
    });

    assert.dom('[data-test-button-loader]').doesNotExist();
  });

  test('it should render recentQuestion from service as input field value', async function (assert) {
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    assert
      .dom('[data-test-label]')
      .hasTextContaining(this.survey.recentQuestion.question);
  });

  test('it should render answerValue in input box', async function (assert) {
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    assert.dom('[data-test-input-field]').hasValue(this.answerValue);
  });

  test('it should trigger inputHandler on typing in the input box', async function (assert) {
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);
    const stringToType = ' I am working!';
    await typeIn('[data-test-input-field]', stringToType);

    assert.verifySteps(
      Array(14).fill('inputHandler triggered'),
      'inputHandler working fine!',
    );

    assert
      .dom('[data-test-input-field]')
      .hasValue(this.answerValue + stringToType);
  });

  test("it should have error class on input if validationDetails.isError is true and shouldn't have error class if validationDetails.isError is false", async function (assert) {
    this.set('validationDetails', {
      isError: true,
      isHelperTextVisible: true,
      helperText: 'Maximum character limit is 19 characters',
    });

    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);

    assert
      .dom('[data-test-input-helper-text]')
      .hasClass('input-box__helper-text--error');

    assert
      .dom('[data-test-input-helper-text]')
      .hasTextContaining('Maximum character limit is 19 characters');
    this.set('validationDetails', {
      isError: false,
      isHelperTextVisible: true,
      helperText: '',
    });

    assert
      .dom('[data-test-input-helper-text]')
      .hasNoClass('input-box__helper-text--error');
    assert.dom('[data-test-input-helper-text]').hasTextContaining('');
  });

  test('it should show helper text if validationDetails.isHelperTextVisible is true or vice-versa', async function (assert) {
    await render(hbs`
    <AnswerReplyModal
    @openModal={{this.openModal}}
    @closeModal={{this.closeModal}}
    @isOpen={{this.isOpen}}
    @inputHandler={{this.inputHandler}}
    @answerValue={{this.answerValue}}
    @questionAsked={{this.survey.recentQuestion}}
    @onSubmit={{this.onSubmit}}
    @validationDetails={{this.validationDetails}}
    @submitButtonState={{this.submitButtonState}}
    />
    `);
    assert.dom('[data-test-input-helper-text]').exists();
    assert
      .dom('[data-test-input-helper-text]')
      .hasTextContaining('Minimum character limit is 10 characters');

    this.set('validationDetails', {
      isError: false,
      isHelperTextVisible: false,
      helperText: 'Minimum character limit is 10 characters',
    });

    assert.dom('[data-test-input-helper-text]').doesNotExist();
  });
});
