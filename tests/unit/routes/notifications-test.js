import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';

module('Unit | Route | notifications', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    assert.expect(1);
    const route = this.owner.lookup('route:notifications');
    assert.ok(route);
  });

  test('beforeModel redirects to page-not-found when dev param is not true', function (assert) {
    assert.expect(5);
    const route = this.owner.lookup('route:notifications');
    let transitionToCount = 0;

    route.router = {
      transitionTo(routeName) {
        transitionToCount++;
        assert.strictEqual(
          routeName,
          'page-not-found',
          'should redirect to 404',
        );
      },
    };

    route.beforeModel({
      to: {
        queryParams: {
          dev: 'false',
        },
      },
    });
    assert.strictEqual(transitionToCount, 1, 'transition occurred');

    route.beforeModel({
      to: {
        queryParams: {},
      },
    });
    assert.strictEqual(transitionToCount, 2, 'transition occurred');

    route.beforeModel({
      to: {
        queryParams: {
          dev: 'true',
        },
      },
    });
    assert.strictEqual(transitionToCount, 2, 'no transition occurred');
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
