import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';

module('Integration | Helper | checkAuth', function (hooks) {
  setupRenderingTest(hooks);

  test('returns false when cookie is not present', async function (assert) {
    const cookie = document.cookie.includes('loggedIn=true');
    assert.false(cookie);
  });

  test('returns true when cookie is present', async function (assert) {
    document.cookie = 'loggedIn=true';
    const cookie = document.cookie.includes('loggedIn=true');
    assert.true(cookie);
  });
});
