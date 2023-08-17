import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ANKUSH_TWITTER } from '../../constants/urls';

module('Integration | Component | step-five', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
    assert.expect(12);

    await render(hbs`<JoinSteps::StepFive />`);

    assert
      .dom('[data-test-link-text]')
      .hasText('Here is your personalized link');
    assert.dom('[data-test-copy-btn]').hasText('Copy');
    assert.dom('[data-test-next-text]').hasText('Next Steps :');
    assert.dom('[data-test-instructions]').hasTagName('ol');
    assert.dom('[data-test-instone]').hasText('Copy the above link');
    assert
      .dom('[data-test-insttwo]')
      .hasText('Follow Ankush Dharkar on Twitter');
    assert.dom('[data-test-insttwo-link]').hasProperty('href', ANKUSH_TWITTER);
    assert
      .dom('[data-test-instthree]')
      .hasText(
        'Message this link to him with this Real Dev Squad verification link'
      );
    assert
      .dom('[data-test-instfour]')
      .hasText('Wait for him to verify the link');
    assert
      .dom('[data-test-instfive]')
      .hasText(
        'If the link is verified you will hear back with a personalized joining link within 7 working days'
      );

    assert
      .dom('[data-test-button="back-to-home"]')
      .hasText('Back to Home')
      .exists();
  });
});
