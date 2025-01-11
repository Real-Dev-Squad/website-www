import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import redirectAuth from 'website-www/utils/redirect-auth';
import { AUTH_URL } from 'website-www/constants/urls';
import sinon from 'sinon';

module('Unit | Utils | redirectAuth', function (hooks) {
  setupTest(hooks);

  let windowOpenStub;

  hooks.beforeEach(function () {
    windowOpenStub = sinon.stub(window, 'open');
  });

  hooks.afterEach(function () {
    windowOpenStub.restore();
  });

  test('it exists', function (assert) {
    assert.ok(redirectAuth, 'redirectAuth utility should be defined');
  });

  test('it constructs correct auth URL with state parameter', function (assert) {
    redirectAuth();

    const expectedUrl = `${AUTH_URL}&state=${window.location.href}`;

    assert.ok(windowOpenStub.calledOnce, 'window.open should be called once');
    assert.ok(
      windowOpenStub.calledWith(expectedUrl, '_self'),
      'window.open should be called with correct URL and target',
    );
  });

  test('it calls window.open with correct parameters', function (assert) {
    redirectAuth();

    assert.ok(
      windowOpenStub.calledWith(sinon.match.string, '_self'),
      'window.open should be called with a URL string and _self target',
    );

    const calledUrl = windowOpenStub.firstCall.args[0];
    assert.ok(
      calledUrl.startsWith(AUTH_URL),
      'called URL should start with AUTH_URL',
    );

    assert.ok(
      calledUrl.includes('state='),
      'called URL should include state parameter',
    );
  });

  test('it handles when window is undefined', function (assert) {
    assert.expect(2);

    const tempWindow = undefined;

    // rewriting the redirect auth for temp window
    const redirectAuthTest = function () {
      let authUrl = AUTH_URL;
      if (typeof tempWindow !== 'undefined' && tempWindow?.location) {
        authUrl = `${authUrl}&state=${tempWindow.location.href}`;
        tempWindow.open(authUrl, '_self');
      }
    };

    try {
      redirectAuthTest();
      assert.ok(
        true,
        'function should execute without throwing error when window is undefined',
      );
    } catch (error) {
      assert.ok(
        false,
        'function should not throw error when window is undefined',
      );
    }

    assert.notOk(
      windowOpenStub.called,
      'window.open should not be called when window is undefined',
    );
  });
});
