import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | join section button', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    assert.dom('.join-section a.button').exists();
    assert.dom('.join-section a.button').hasText('Join the Squad');
    await click('.join-section a.button');

    assert.strictEqual(currentURL(), '/join');
  });
});
