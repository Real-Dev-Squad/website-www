import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

class LoginStub extends Service {
  userData = { profileStatus: 'PENDING' };
}

module('Integration | Component | identity-steps/step-seven', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:login', LoginStub);
  });

  test('renders heading on verification page when profile status is pending', async function (assert) {
    const objToCheckFunction = {
      isHandleRefresh: assert.ok(true, 'isHandleRefresh is working fine!'),
    };
    this.set('handleRefresh', () => {
      objToCheckFunction.isHandleRefresh;
    });
    await render(
      hbs`<IdentitySteps::StepSeven @handleRefresh={{this.handleRefresh}} />`
    );

    assert
      .dom('[data-test-verification-heading]')
      .hasClass('verification-page__heading');
    assert.dom('[data-test-verification-heading]').hasText('Pending');
  });

  test('render description on verification page when profile status is pending', async function (assert) {
    const objToCheckFunction = {
      isHandleRefresh: assert.ok(true, 'isHandleRefresh is working fine!'),
    };
    this.set('handleRefresh', () => {
      objToCheckFunction.isHandleRefresh;
    });
    await render(
      hbs`<IdentitySteps::StepSeven @handleRefresh={{this.handleRefresh}} />`
    );

    assert
      .dom('[data-test-verification-description]')
      .hasClass('verification-page__description');
    assert
      .dom('[data-test-verification-description1]')
      .hasText('Refresh to Check Verification Status');
    assert
      .dom('[data-test-verification-description2]')
      .hasText('Your Profile Service Linked with Real Dev Squad Service');
  });

  test('render Refresh button on verification page when profile status is pending', async function (assert) {
    const objToCheckFunction = {
      isHandleRefresh: assert.ok(true, 'isHandleRefresh is working fine!'),
    };
    this.set('handleRefresh', () => {
      objToCheckFunction.isHandleRefresh;
    });
    await render(
      hbs`<IdentitySteps::StepSeven @handleRefresh={{this.handleRefresh}} />`
    );

    assert.dom('[data-test-button=refresh]').hasText('Refresh');
    assert.dom('[data-test-button=refresh]').hasProperty('type', 'button');
  });

  test('clicking Refresh button refresh the verification page when profile status is pending', async function (assert) {
    const objToCheckFunction = {
      isHandleRefresh: assert.ok(true, 'isHandleRefresh is working fine!'),
    };
    this.set('handleRefresh', () => {
      objToCheckFunction.isHandleRefresh;
    });
    await render(
      hbs`<IdentitySteps::StepSeven @handleRefresh={{this.handleRefresh}} />`
    );

    await click('[data-test-button=refresh]');
    assert.dom('[data-test-button=refresh]').hasText('Refresh');
    assert.dom('[data-test-button=refresh]').hasProperty('type', 'button');
  });
});
