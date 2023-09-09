import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-zero', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders all logos on login page', async function (assert) {
    // assert.expect(10);
    await render(hbs`<SignupSteps::StepZero />`);
    assert.dom('[data-test-rds-logo]').exists();
    // assert
    //   .dom('[data-test-rds-logo-img]')
    //   .hasAttribute('src', 'assets/icons/rds-github-link.png')
    //   .hasAttribute('alt', 'RDS-Logo');
  });
  test.skip('it renders correctly when the user is logged in', async function (assert) {
    // this.login = this.owner.lookup('service:login');
    // this.set('login', false);
    this.set('loginwithgithub', () => {
      this.login = true;
    });

    await render(hbs`<SignupSteps::StepZero />`);

    assert.dom('[data-test-rds-logo-img]').exists();
    // Add other assertions
  });
});
