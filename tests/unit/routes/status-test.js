import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import sinon from 'sinon';
import { USER_STATES } from 'website-www/constants/user-status';
import { SELF_USER_STATUS_URL } from 'website-www/constants/apis';

module('Unit | Route | status', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.fetchStub = sinon.stub(window, 'fetch');
    this.route = this.owner.lookup('route:status');
    sinon.stub(this.route.router, 'transitionTo');
  });

  hooks.afterEach(function () {
    this.fetchStub.restore();
    sinon.restore();
  });

  test('it exists', function (assert) {
    assert.expect(1);
    const route = this.owner.lookup('route:status');
    assert.ok(route, 'The status route exists');
  });

  test('it fetches user status and returns it if API responds with 200', async function (assert) {
    const userStatus = USER_STATES.ACTIVE;

    this.fetchStub.resolves(
      new Response(
        JSON.stringify({ data: { currentStatus: { state: userStatus } } }),
        { status: 200 },
      ),
    );

    const result = await this.route.model();

    assert.ok(
      this.fetchStub.calledOnceWith(SELF_USER_STATUS_URL),
      'Fetch called with correct URL',
    );
    assert.strictEqual(result, userStatus, 'Returns the user status from API');
  });

  test('displays error toast and redirects in case of 401 response', async function (assert) {
    this.fetchStub.resolves(new Response(JSON.stringify({}), { status: 401 }));
    const result = await this.route.model();
    assert.strictEqual(result, undefined, 'No result returned for 401');
  });

  test('returns user status DNE on 404 error and displays toast', async function (assert) {
    this.fetchStub.resolves(new Response(JSON.stringify({}), { status: 404 }));
    const result = await this.route.model();
    assert.strictEqual(
      result,
      USER_STATES.DNE,
      'Returns USER_STATES.DNE on 404',
    );
  });
});
