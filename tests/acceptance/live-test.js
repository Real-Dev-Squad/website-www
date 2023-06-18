import { module, test } from 'qunit';
import { visit, currentURL, typeIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | live', function (hooks) {
  setupApplicationTest(hooks);
  // TODO - remove test for dev part when it goes to production
  test('skeleton and video should exists after join modal', async function (assert) {
    assert.expect(6);
    await visit('/live');

    assert.notEqual(currentURL(), '/live', 'url not equal to live!');
    assert.strictEqual(
      currentURL(),
      '/page-not-found',
      'url is /page-not-found'
    );

    await visit('/live?dev=true&role=guest');

    assert.strictEqual(
      currentURL(),
      '/live?dev=true&role=guest',
      'we are on live page as a guest'
    );
    assert.dom('[data-test-card]').exists();
    assert.dom('[data-test-input-field]').exists();
    assert.dom('[data-test-button="live-join"]').exists();

    await typeIn('[data-test-input-field]', 'sanket');
    await click('[data-test-button="live-join"]');
  });
});
