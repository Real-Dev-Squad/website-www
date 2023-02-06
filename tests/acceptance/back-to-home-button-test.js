import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | back to home button', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /join', async function (assert) {
    await visit('/join');
    assert.strictEqual(currentURL(), '/join', 'We are on the join page');
    assert.dom('[data-test-button="back-to-home"]').exists();
    await click('[data-test-button="back-to-home"]');
    assert.strictEqual(currentURL(), '/', 'We are on the home page');
  });
});
