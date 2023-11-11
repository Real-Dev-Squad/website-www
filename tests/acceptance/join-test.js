import { module, skip } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';
import Service from '@ember/service';

class LoginStub extends Service {
  userData = { profileStatus: 'BLOCKED' };
}

module('Acceptance | join', function (hooks) {
  setupApplicationTest(hooks);

  skip('clicking Verify Again button redirect to chaincode page when profile status is blocked', async function (assert) {
    hooks.before(function () {
      this.owner.register('service:login', LoginStub);
    });
    await visit('/join?dev=true&step=13');

    assert.strictEqual(currentURL(), '/join?dev=true&step=13');

    await click('[data-test-button=verify-again]');

    assert.strictEqual(currentURL(), '/join?dev=true&step=10');
  });
});
