import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import sinon from 'sinon';
import { SELF_USER_PROFILE_URL } from 'website-www/constants/apis';
import { nonSuperUserData } from 'website-www/tests/constants/users-data';

module('Unit | Route | mobile', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.fetchStub = sinon.stub(window, 'fetch');
    this.route = this.owner.lookup('route:mobile');
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

  test('it fetches user profile and returns userId if API responds with 200', async function (assert) {
    const userId = nonSuperUserData.userId;
    this.fetchStub.resolves(
      new Response(JSON.stringify({ id: userId }), { status: 200 }),
    );

    const result = await this.route.model();

    assert.ok(
      this.fetchStub.calledOnceWith(SELF_USER_PROFILE_URL, {
        credentials: 'include',
      }),
      'Fetch called with correct URL and options',
    );
    assert.strictEqual(
      result.userId,
      userId,
      'Returns the correct userId from API',
    );
  });

  test('displays error in case of 401 response', async function (assert) {
    this.fetchStub.resolves(new Response(JSON.stringify({}), { status: 401 }));
    const result = await this.route.model();
    assert.strictEqual(result, undefined, 'No result returned for 401');
  });
});
