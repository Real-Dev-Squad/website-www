import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';
import { render, setupRenderingContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Acceptance | back to home button', function (hooks) {
  setupApplicationTest(hooks);

  test.skip('visiting /join', async function (assert) {
    assert.expect(3);

    await visit('/join');
    assert.strictEqual(currentURL(), '/join', 'We are on the join page');
    await setupRenderingContext(this);
    await render(hbs`<JoinSteps::StepFive />`);
    assert.dom('[data-test-button="back-to-home"]').exists();
    await click('[data-test-button="back-to-home"]');
    assert.strictEqual(currentURL(), '/', 'We are on the home page');
  });
});
