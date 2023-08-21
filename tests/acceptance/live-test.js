import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | live', function (hooks) {
  setupApplicationTest(hooks);
  // TODO - remove test for dev part when it goes to production
  test('skeleton and video should exists after join modal', async function (assert) {
    assert.expect(5);
    await visit('/live');

    assert.notEqual(currentURL(), '/live', 'url not equal to live!');
    assert.strictEqual(
      currentURL(),
      '/page-not-found',
      'url is /page-not-found'
    );

    await visit('/live?dev=true');

    assert.strictEqual(currentURL(), '/live?dev=true', 'we are on live page');
    assert.dom('[data-test-live-roles-card]').exists();
    assert.dom('[data-test-live-roles-card-title]').exists();
  });
});
