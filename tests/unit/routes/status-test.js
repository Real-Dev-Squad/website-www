import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import sinon from 'sinon';
import { USER_STATES } from 'website-www/constants/user-status';
import { APPS } from 'website-www/constants/urls';
const API_BASE_URL = APPS.API_BACKEND;

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

  test('redirects to 404 page if dev flag is not present', function (assert) {
    const transition = { to: { queryParams: { dev: 'false' } } };

    this.route.beforeModel(transition);

    assert.ok(
      this.route.router.transitionTo.calledOnceWith('/page-not-found'),
      'Redirected to /page-not-found when dev is not true',
    );
  });

  test('allows access when dev flag is true', function (assert) {
    const transition = { to: { queryParams: { dev: 'true' } } };

    this.route.beforeModel(transition);

    assert.ok(
      this.route.router.transitionTo.notCalled,
      'No redirection occurs when dev query param is true',
    );
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
      this.fetchStub.calledOnceWith(`${API_BASE_URL}/users/status/self`),
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
