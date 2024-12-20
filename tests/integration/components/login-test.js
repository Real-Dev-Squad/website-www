import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { APPS } from '../../constants/urls';

module('Integration | Component | login', function (hooks) {
  setupRenderingTest(hooks);

  test('renders content & generates correct auth URLs', async function (assert) {
    await render(hbs`<Login />`);

    assert.dom('.login__container').exists();
    assert.dom('.login__container h3').hasText('Sign In to Real Dev Squad');

    assert
      .dom('[data-test-login=github]')
      .exists()
      .hasAttribute(
        'href',
        `${APPS.STAGING_API_BACKEND}/auth/github/login?redirectURL=${window.location.href}`,
      );
    assert
      .dom('[data-test-login=google]')
      .exists()
      .hasAttribute(
        'href',
        `${APPS.STAGING_API_BACKEND}/auth/google/login?dev=true&redirectURL=${window.location.href}`,
      );
  });
});
