import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { currentURL } from '@ember/test-helpers';

module('Unit | Route | notifications', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    assert.expect(1);
    const route = this.owner.lookup('route:notifications');
    assert.ok(route);
  });

  test('it should redirect to "/page-not-found" page when dev flag is not present', async function (assert) {
    assert.expect(3);

    const route = this.owner.lookup('route:notifications');

    await route.beforeModel({
      to: {
        queryParams: {
          dev: 'false',
        },
      },
    });
    assert.strictEqual(currentURL(), '/page-not-found');

    await route.beforeModel({
      to: {
        queryParams: {},
      },
    });
    assert.strictEqual(currentURL(), '/page-not-found');

    await route.beforeModel({
      to: {
        queryParams: {
          dev: 'true',
        },
      },
    });
    assert.strictEqual(currentURL(), '/notifications');
  });

  test('queryParams configuration', function (assert) {
    assert.expect(1);
    const route = this.owner.lookup('route:notifications');

    assert.deepEqual(
      route.queryParams,
      {
        dev: {
          refreshModel: false,
        },
      },
      'queryParams should be correctly configured',
    );
  });
});
