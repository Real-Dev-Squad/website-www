import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-zero', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders all logos on login page', async function (assert) {
    // assert.expect(10);
    await render(hbs`<SignupSteps::StepZero />`);

    // assert.dom('[data-test-logos-container]').exists();
    // assert.dom('[data-test-github-logo]').exists();
    // assert.dom('[data-test-link-logo]').exists();
    assert.dom('[data-test-rds-logo]').exists();
    // assert.dom('[data-test-rds-logo-img]');
    // .hasAttribute('src', 'assets/icons/rds-github-link.png')
    // .hasAttribute('alt', 'RDS-Logo');
  });
});
