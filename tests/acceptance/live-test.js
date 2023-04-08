import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | live', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /live', async function (assert) {
    await visit('/live');

    assert.strictEqual(currentURL(), '/live');
    assert.dom('[data-test-button="share"]').hasText('Screenshare');
  });
});
