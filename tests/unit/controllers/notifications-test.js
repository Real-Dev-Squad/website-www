import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { NOTIFICATIONS } from 'website-www/constants/notifications';

module('Unit | Controller | notifications', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:notifications');
    assert.ok(controller);
  });

  test('notifications property is set correctly', function (assert) {
    const controller = this.owner.lookup('controller:notifications');
    assert.deepEqual(
      controller.notifications,
      NOTIFICATIONS,
      'notifications should be set to NOTIFICATIONS constant',
    );
  });
});
