import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { visit } from '@ember/test-helpers';

module.only('Unit | Route | subscribe', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:subscribe');
    assert.ok(route);
  });

  test('model hook returns undefined', function (assert) {
    let route = this.owner.lookup('route:subscribe');
    assert.strictEqual(
      route.model(),
      undefined,
      'model hook should return undefined',
    );
  });

  test('visiting /subscribe', async function (assert) {
    await visit('/subscribe');
    assert.expect(2);

    // Assuming there are elements with these data-test attributes on the subscribe page
    assert.dom('[data-test-subscribe-form]').exists('Subscribe form exists');
    assert.dom('[data-test-subscribe-title]').exists('Subscribe title exists');
  });
});
