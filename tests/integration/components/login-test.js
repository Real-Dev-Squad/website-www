import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { APPS } from '../../constants/urls';

module('Integration | Component | login', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders content', async function (assert) {
    await render(hbs`<Login />`);

    assert.dom('.login__container').exists();
    assert.dom('.login__container h3').hasText('Sign In to Real Dev Squad');

    assert
      .dom('[data-test-github-auth]')
      .exists('Github auth button is rendered');
    assert.dom('[data-test-github-auth]').hasText('Sign In with GitHub');

    assert
      .dom('[data-test-google-auth]')
      .exists('Google auth button is rendered');
    assert.dom('[data-test-google-auth]').hasText('Sign In with Google');
  });

  test('generates correct auth URLs', async function (assert) {
    await render(hbs`<Login />`);

    assert
      .dom('[data-test-github-auth]')
      .exists()
      .hasAttribute(
        'href',
        `${APPS.API_BACKEND}/auth/github/login?redirectURL=${window.location.href}`,
      );
    assert
      .dom('[data-test-google-auth]')
      .exists()
      .hasAttribute(
        'href',
        `${APPS.API_BACKEND}/auth/google/login?dev=true&redirectURL=${window.location.href}`,
      );
  });
});
