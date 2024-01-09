import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-two', function (hooks) {
  setupRenderingTest(hooks);

  test('stepTwo renders', async function (assert) {
    assert.expect(6);
    let clicked = false;
    this.set('startHandler', () => {
      clicked = true;
    });

    await render(
      hbs`<IdentitySteps::StepTwo @startHandler={{this.startHandler}} />`,
    );
    assert
      .dom('[data-test-getting-started-heading]')
      .hasText('Challenge Time !!');
    assert
      .dom('[data-test-getting-started-paragraph-1]')
      .hasText(
        'To add/update your profile details, link your profile service with Real Dev Squad service',
      );
    assert
      .dom('[data-test-getting-started-paragraph-2]')
      .hasText(
        'After exploring the sample profile service, proceed to the next step by clicking the button below.',
      );
    assert
      .dom('.profile-service__link')
      .hasAttribute(
        'href',
        'https://github.com/Real-Dev-Squad/sample-profile-service',
      );
    assert.dom('[data-test-button=identity-next]').hasText('Next');
    await click('[data-test-button=identity-next]');
    assert.true(clicked, 'click is called');
  });
});
