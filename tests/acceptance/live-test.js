import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | live', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /live', async function (assert) {
    await visit('/live');

    assert.strictEqual(currentURL(), '/live');
    assert.dom('[data-test-tabs]').exists();
  });

  test('join component should be visible', async function (assert) {
    await visit('/live');
    this.set('activeTab', 'Screenshare');

    assert.dom('[data-test-card]').exists();
    assert.dom('[data-test-card-title]').exists();
    assert.dom('[data-test-card-title]').hasText('Join the Event');
  });
});
