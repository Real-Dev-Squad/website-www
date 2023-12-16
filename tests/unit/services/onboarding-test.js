import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | onboarding', function (hooks) {
  setupTest(hooks);

  test('generateUsername method', async function (assert) {
    let service = this.owner.lookup('service:onboarding');
    let store = this.owner.lookup('service:store');

    store.queryRecord = () =>
      Promise.resolve({
        username: 'testuser',
      });

    let user = await service.generateUsername('Test', 'User');

    assert.ok(user, 'User was found');
    assert.strictEqual(user.username, 'testuser', 'Username is correct');
  });

  test('signup method', async function (assert) {
    let service = this.owner.lookup('service:onboarding');
    let store = this.owner.lookup('service:store');

    store.createRecord = () => ({
      setProperties() {},
      save() {
        return Promise.resolve();
      },
    });

    let dataToUpdate = {
      username: 'testuser',
      roles: {},
    };

    await service.signup(dataToUpdate, 'role');
    assert.ok(true, 'No errors were thrown');
  });
});
