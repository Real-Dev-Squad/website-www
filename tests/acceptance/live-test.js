import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | live', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /live', async function (assert) {
    assert.expect(4);
    await visit('/live');

    assert.notEqual(currentURL(), '/live', 'url not equal to live!');
    assert.strictEqual(
      currentURL(),
      '/page-not-found',
      'url is /page-not-found'
    );

    await visit('/live?dev=true');

    assert.strictEqual(currentURL(), '/live?dev=true', 'we are on live page!');
    assert.dom('[data-test-tabs]').exists();
  });

  test('join component should be visible', async function (assert) {
    await visit('/live?dev=true');
    this.set('activeTab', 'Screenshare');

    assert.dom('[data-test-card]').exists();
    assert.dom('[data-test-card-title]').exists();
    assert.dom('[data-test-card-title]').hasText('Join the Event');
  });
});
