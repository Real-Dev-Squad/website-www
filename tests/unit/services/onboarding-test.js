import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | onboarding', function (hooks) {
  setupTest(hooks);

  test('generateUsername method', async function (assert) {
    assert.expect(4);

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

    let user = await service.generateUsername('Test', 'User');

    assert.ok(user, 'User was found');
    assert.strictEqual(
      user.get('username'),
      'test-user',
      'Username is correct',
    );

    assert.verifySteps(['store.queryRecord called']);
  });

  test('signup method', async function (assert) {
    assert.expect(7);

    let service = this.owner.lookup('service:onboarding');
    let store = this.owner.lookup('service:store');

    let setPropertiesCalled = false;
    let saveCalled = false;

    store.peekRecord = () => null;

    store.createRecord = () => {
      assert.step('store.createRecord called');
      return {
        setProperties() {
          setPropertiesCalled = true;
          assert.step('setProperties called');
        },
        save() {
          saveCalled = true;
          assert.step('save called');
          return Promise.resolve();
        },
      };
    };

    let dataToUpdate = {
      username: 'testuser',
      roles: {
        maven: true,
      },
    };

    await service.signup(dataToUpdate, 'role');
    assert.ok(true, 'No errors were thrown');

    assert.verifySteps([
      'store.createRecord called',
      'setProperties called',
      'save called',
    ]);

    assert.ok(setPropertiesCalled, 'setProperties should be called');
    assert.ok(saveCalled, 'save should be called');
  });
});
