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
    this.originalFetch = window.fetch;
    this.owner.register('service:fastboot', MockFasbootService);

    window.fetch = (url, configs) => {
      console.log(`fetch called with url: ${url}`);
      console.log('configs ', configs);
      const response = {
        status: 200,
        json: () =>
          Promise.resolve({
            incompleteUserDetails: false,
          }),
        clone: () => {
          return {
            blob: () => {
              return Promise.resolve();
            },
          };
        },
      };

      return Promise.resolve(response);
    };
  });

  hooks.afterEach(function () {
    window.fetch = this.originalFetch;
  });

  test('it should login the user and set isLoggedIn to true and isLoading to false', async function (assert) {
    assert.expect(2);

    let service = this.owner.lookup('service:login');
    await settled();
    assert.ok(service.get('isLoggedIn'), 'isLoggedIn is set to true');
    assert.ok(service);
  });

  test('it should set isLoading to false when user login', async function (assert) {
    assert.expect(1);

    let service = this.owner.lookup('service:login');

    await settled(); // wait for promises to settle

    assert.notOk(service.get('isLoading'), 'isLoading is set to false');
  });

  test('it should set isLoggedIn to false if promise gets rejected', async function (assert) {
    assert.expect(1);
    let fetch = window.fetch;
    window.fetch = (url, configs) => {
      console.log(`fetch called with url: ${url}`);
      console.log('configs ', configs);
      const response = {
        status: 200,
        json: () => Promise.reject('Authentication failed'),
        clone: () => {
          return {
            blob: () => {
              return Promise.resolve();
            },
          };
        },
      };

      return Promise.resolve(response);
    };

    let service = this.owner.lookup('service:login');
    await settled(); // wait for promises to settle

    assert.notOk(service.get('isLoggedIn'), 'isLoggedIn is set to false');
    window.fetch = fetch;
  });
});
