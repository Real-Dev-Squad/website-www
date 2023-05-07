import { module, test } from 'qunit';
import { visit, currentURL, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | live', function (hooks) {
  setupApplicationTest(hooks);

  test('skeleton and video conditionally exists!', async function (assert) {
    assert.expect(5);
    await visit('/live');

    assert.strictEqual(currentURL(), '/live', 'We are on the live page!');
    assert.dom('[data-test-skeleton]').exists();
    assert.dom('[data-test-video]').doesNotExist();

    await waitFor('[data-test-video]', { timeout: 4000 });
    
    assert.dom('[data-test-video]').exists();
    assert.dom('[data-test-skeleton]').doesNotExist();
  });
});
