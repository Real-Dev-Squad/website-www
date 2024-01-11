import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
class MockSurveyService extends Service {
  recentQuestion = 'This is mock recent question';
}
module('Integration | Component | answer-reply-modal', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    // Registering the mock survey service
    this.owner.register('service:survey', MockSurveyService);
    const surveyService = this.owner.lookup('service:survey');

    this.setProperties({
      openModal: () => assert.ok(true, 'openModal working fine!'),
      closeModal: () => assert.ok(true, 'closeModal working fine!'),
      isOpen: true,
      inputHandler: () => assert.ok(true, 'onAnswerInput working fine!'),
      answerValue: 'mock answer value',
      onSubmit: () => assert.ok(true, 'submitAnswer working fine!'),
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
  });
});
