import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | signup-steps/step-zero', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders all logos on login page', async function (assert) {
    assert.expect(10);
    await render(hbs`<SignupSteps::StepZero />`);

    assert.dom('[data-test-logos-container]').exists();
    assert.dom('[data-test-github-logo]').exists();
    assert.dom('[data-test-link-logo]').exists();
    assert.dom('[data-test-rds-logo]').exists();
    assert
      .dom('[data-test-github-logo-img]')
      .hasAttribute('src', 'assets/icons/github-logo.png')
      .hasAttribute('alt', 'GitHub-Logo');
    assert
      .dom('[data-test-link-logo-img]')
      .hasAttribute('src', 'assets/icons/link.png')
      .hasAttribute('alt', 'Link-Logo');
    assert
      .dom('[data-test-rds-logo-img]')
      .hasAttribute('src', 'assets/icons/rds-logo.jpg')
      .hasAttribute('alt', 'RDS-Logo');
  });
});
