import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

class LoginStub extends Service {
  @tracked isLoggedIn = false;

  loginwithgithub() {
    this.isLoggedIn = true;
  }
}

module('Integration | Component | signup-steps/step-zero', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:login', LoginStub);
  });

  test('it renders all logos on login page', async function (assert) {
    await render(hbs`<SignupSteps::StepZero />`);
    assert.dom('[data-test-rds-logo]').exists();
  });

  test('it renders correctly when the user is logged in', async function (assert) {
    this.loginService = this.owner.lookup('service:login');
    this.loginService.loginwithgithub();

    this.set('letsGoHandler', () => {});

    await render(
      hbs`<SignupSteps::StepZero @letsGoHandler={{this.letsGoHandler}} />`
    );

    assert.dom('[data-test-rds-logo-img]').exists();
    // assert.dom('[data-test=lets-go]').exists('data-test-lets-go');
  });

  test('it renders correctly when the user is not logged in', async function (assert) {
    this.set('letsGoHandler', () => {});

    await render(
      hbs`<SignupSteps::StepZero @letsGoHandler={{this.letsGoHandler}} />`
    );

    assert.dom('[data-test-rds-logo]').exists();
    assert
      .dom('.signup-page-heading')
      .hasText('You are not logged in. Please log in to continue...');
  });
});
