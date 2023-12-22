import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | onboarding', function (hooks) {
  setupTest(hooks);

  test('generateUsername method', async function (assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:onboarding');
    let store = this.owner.lookup('service:store');

    store.queryRecord = () =>
      Promise.resolve({
        username: 'test-user',
        get(key) {
          return this[key];
        },
      });

    assert.step('store.queryRecord called');

    const user = await service.generateUsername('Test', 'User');
    const username = user?.get('username');

    assert.strictEqual(username, 'test-user', 'Username is correct');

    assert.verifySteps(['store.queryRecord called']);
  });

  test('signup method for Developer role', async function (assert) {
    assert.expect(4);

    let service = this.owner.lookup('service:onboarding');
    let store = this.owner.lookup('service:store');

    store.peekRecord = () => null;

    store.createRecord = (modelName, properties) => {
      assert.step('store.createRecord called');
      let mockRecord = {
        setProperties() {
          assert.step('setProperties called');
        },
        save() {
          assert.step('save called');
          return Promise.resolve();
        },
      };

      Object.assign(mockRecord, properties);

      return mockRecord;
    };

    let dataToUpdate = {
      username: 'testuser',
    };

    await service.signup(dataToUpdate);

    assert.verifySteps([
      'store.createRecord called',
      'setProperties called',
      'save called',
    ]);
  });

  test('signup method for non-Developer role', async function (assert) {
    assert.expect(2);

    let service = this.owner.lookup('service:onboarding');
    let store = this.owner.lookup('service:store');

    store.peekRecord = () => null;

    store.createRecord = (properties) => {
      assert.step('store.createRecord called');

      let mockRecord = {
        setProperties() {
          assert.step('setProperties called');
        },
        save() {
          assert.step('save called');
          return Promise.resolve();
        },
      };

      Object.assign(mockRecord, properties);

      return mockRecord;
    };

    let dataToUpdate = {
      username: 'testuser',
      roles: {
        maven: true,
      },
    };

    await service.signup(dataToUpdate);

    assert.verifySteps(['store.createRecord called']);
  });
});
