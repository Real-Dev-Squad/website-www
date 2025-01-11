import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import ENV from 'website-www/config/environment';

module('Unit | Route | profile', function (hooks) {
  setupTest(hooks);
  hooks.beforeEach(function () {
    this.fetchStub = sinon.stub(window, 'fetch');
    this.route = this.owner.lookup('route:profile');
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

  test('it fetches and transforms model data correctly', async function (assert) {
    this.fetchStub.onCall(0).resolves(
      new Response(JSON.stringify({ developerRoleExistsOnUser: true }), {
        status: 200,
      }),
    );

    this.fetchStub.onCall(1).resolves(
      new Response(
        JSON.stringify({
          first_name: 'John',
          last_name: 'Doe',
          company: 'RDS',
          designation: 'developer',
          linkedin_id: '123_@john',
          twitter_id: '123_@john',
          website: 'website.com',
        }),
        { status: 200 },
      ),
    );

    const model = await this.route.model();

    assert.deepEqual(
      model,
      {
        first_name: 'John',
        last_name: 'Doe',
        company: 'RDS',
        designation: 'developer',
        linkedin_id: '123_@john',
        twitter_id: '123_@john',
        website: 'website.com',
        isDeveloper: true,
      },
      'Model data is fetched and transformed correctly',
    );

    assert.ok(
      this.fetchStub.firstCall.calledWith(
        `${ENV.BASE_API_URL}/users/isDeveloper`,
        { credentials: 'include' },
      ),
      'First API call is made to check developer status',
    );

    assert.ok(
      this.fetchStub.secondCall.calledWith(
        `${ENV.BASE_API_URL}/users?profile=true`,
        { credentials: 'include' },
      ),
      'Second API call is made to fetch user data',
    );
  });
});
