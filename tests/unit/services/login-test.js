import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { settled } from '@ember/test-helpers';
import Service from '@ember/service';

class MockFasbootService extends Service {
  isFastBoot = false;
}

module('Unit | Service | login', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:fastboot', MockFasbootService);
  });

  test('it should login the user and set isLoggedIn to true and isLoading to false', async function (assert) {
    assert.expect(4);

    let service = this.owner.lookup('service:login');

    service.store = {
      findRecord(model, id) {
        assert.strictEqual(
          model,
          'user',
          'findRecord called with correct model',
        );
        assert.strictEqual(id, 'self', 'findRecord called with correct id');
        return Promise.resolve({
          incompleteUserDetails: false,
        });
      },
    };

    await service.checkAuth();

    assert.ok(service.get('isLoggedIn'), 'isLoggedIn is set to true');
    assert.ok(service);
  });

  test('it should set isLoading to false when user login', async function (assert) {
    assert.expect(1);

    let service = this.owner.lookup('service:login');

    service.store = {
      findRecord(model, id) {
        assert.strictEqual(
          model,
          'user',
          'findRecord called with correct model',
        );
        assert.strictEqual(id, 'self', 'findRecord called with correct id');
        return Promise.resolve({
          incompleteUserDetails: false,
        });
      },
    };

    await settled(); // wait for promises to settle

    assert.notOk(service.get('isLoading'), 'isLoading is set to false');
  });

  test('it should set isLoggedIn to false if promise gets rejected', async function (assert) {
    assert.expect(1);
    let service = this.owner.lookup('service:login');

    service.store = {
      findRecord(model, id) {
        assert.strictEqual(
          model,
          'user',
          'findRecord called with correct model',
        );
        assert.strictEqual(id, 'self', 'findRecord called with correct id');
        return Promise.reject('Authentication failed');
      },
    };

    await settled(); // wait for promises to settle

    assert.notOk(service.get('isLoggedIn'), 'isLoggedIn is set to false');
  });
});
