import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | join section button', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    assert.dom('[data-test-join-button]').exists();
    assert.dom('[data-test-join-button]').hasText('Join the Squad');
    await click('[data-test-join-button]');

    assert.strictEqual(currentURL(), '/join');
  });
});
