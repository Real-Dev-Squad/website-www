import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import ENV from 'website-www/config/environment';
import redirectAuth from 'website-www/utils/redirect-auth';
import { toastNotificationTimeoutOptions } from '../../../app/constants/toast-notification';
module('Unit | Route | profile', function (hooks) {
  setupTest(hooks);
  hooks.beforeEach(function () {
    this.fetchStub = sinon.stub(window, 'fetch');
  });

  hooks.afterEach(function () {
    this.fetchStub.restore();
  });

  test('it fetches and transforms model data correctly', async function (assert) {
    const route = this.owner.lookup('route:profile');

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

    const model = await route.model();

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
        `${ENV.BASE_API_URL}/users/?profile=true`,
        { credentials: 'include' },
      ),
      'Second API call is made to fetch user data',
    );
  });

  test('it handles 401 error and redirects to login', async function (assert) {
    const route = this.owner.lookup('route:profile');
    this.fetchStub
      .onCall(0)
      .resolves(
        new Response({ developerRoleExistsOnUser: false }, { status: 401 }),
      );

    this.fetchStub.onCall(1).resolves(
      new Response(
        {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Unauthenticated User',
        },
        { status: 401 },
      ),
    );

    const toastStub = sinon.stub(this.owner.lookup('service:toast'), 'error');

    const redirectStub = sinon.stub(redirectAuth).callsFake(() => {
      console.log('redirectAuth was called during the test');
    });

    await route.model();

    assert.ok(toastStub.calledOnce, 'Toast error notification was shown');
    assert.ok(
      toastStub.firstCall.calledWith(
        'You are not logged in. Please login to continue.',
        '',
        toastNotificationTimeoutOptions,
      ),
      'Correct error message is passed to toast notification',
    );

    assert.ok(
      redirectStub.calledOnce,
      'redirectAuth was called to redirect the user',
    );

    toastStub.restore();
    redirectStub.restore();
  });
});
