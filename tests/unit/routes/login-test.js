import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { visit, currentURL } from '@ember/test-helpers';

module('Unit | Route | login', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:login');
    assert.ok(route);
  });

  test('it can be only visited with dev flag', async function (assert) {
    await visit('/login?dev=true');

    assert.strictEqual(
      currentURL(),
      '/login?dev=true',
      'User can access /login with dev flag only',
    );
  });

  test('it cannot be visited without dev flag', async function (assert) {
    await visit('/login');

    assert.strictEqual(
      currentURL(),
      '/page-not-found',
      'User cannot access /login without dev flag',
    );
  });
});
