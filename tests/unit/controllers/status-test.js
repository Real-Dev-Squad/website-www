import { module, test } from 'qunit';
import { setupTest } from 'website-www/tests/helpers';
import { USER_STATES } from 'website-www/constants/user-status';
import Service from '@ember/service';
import ENV from 'website-www/config/environment';
import sinon from 'sinon';

class MockToastService extends Service {
  success() {}
  error() {}
}

module('Unit | Controller | status', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:toast', MockToastService);
    this.fetchStub = sinon.stub(window, 'fetch');
  });

  hooks.afterEach(function () {
    this.fetchStub.restore();
  });

  test('it initializes with default values', function (assert) {
    const controller = this.owner.lookup('controller:status');
    assert.false(
      controller.isStatusUpdating,
      'isStatusUpdating is false by default',
    );
    assert.false(
      controller.showUserStateModal,
      'showUserStateModal is false by default',
    );
    assert.strictEqual(
      controller.newStatus,
      undefined,
      'newStatus is undefined by default',
    );
  });

  test('updateStatus sends the correct request', async function (assert) {
    const mockResponse = {
      data: {
        currentStatus: { state: USER_STATES.ACTIVE },
      },
    };

    this.fetchStub.resolves(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const controller = this.owner.lookup('controller:status');
    const newStatus = { currentStatus: { state: 'ACTIVE' } };
    await controller.updateStatus(newStatus);

    assert.ok(this.fetchStub.calledOnce, 'Fetch was called once');
    assert.ok(
      this.fetchStub.calledWith(
        `${ENV.BASE_API_URL}/users/status/self?userStatusFlag=true`,
      ),
      'Fetch was called with the correct URL',
    );
  });

  test('updateStatus correctly handles different user states', async function (assert) {
    assert.expect(10);
    const controller = this.owner.lookup('controller:status');
    const toastService = this.owner.lookup('service:toast');
    toastService.success = sinon.spy();
    toastService.error = sinon.spy();

    const mockResponses = {
      ACTIVE: { data: { currentStatus: { state: USER_STATES.ACTIVE } } },
      OOO: { data: { currentStatus: { state: USER_STATES.OOO } } },
      ONBOARDING: {
        data: { currentStatus: { state: USER_STATES.ONBOARDING } },
      },
      IDLE: { data: { currentStatus: { state: USER_STATES.IDLE } } },
      DNE: { data: { currentStatus: { state: USER_STATES.DNE } } },
    };

    const setupFetchResponse = (status) => {
      this.fetchStub.resolves(
        new Response(JSON.stringify(mockResponses[status]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    };

    for (const state of Object.keys(mockResponses)) {
      setupFetchResponse(state);

      const newStatus = { currentStatus: { state: USER_STATES[state] } };
      await controller.updateStatus(newStatus);
      assert.ok(
        toastService.success.calledOnce,
        `Success toast is shown for ${state}`,
      );
      assert.strictEqual(
        controller.status,
        USER_STATES[state],
        `Status is updated to ${state}`,
      );
      toastService.success.resetHistory();
      this.fetchStub.resetHistory();
    }
  });

  test('toggleUserStateModal works with OOO status', function (assert) {
    let controller = this.owner.lookup('controller:status');
    controller.status = USER_STATES.OOO;
    controller.toggleUserStateModal();
    assert.ok(
      controller.showUserStateModal,
      'User state modal is shown for OOO status',
    );
  });
});
