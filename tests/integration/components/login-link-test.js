import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | login-link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders content', async function (assert) {
    this.set('label', 'For Developers:');
    this.set('auth', 'github');
    this.set('signInText', 'Sign In with GitHub');
    this.set('iconSrc', 'assets/icons/github-logo.png');
    this.set('altText', 'GitHub');

    await render(hbs`
      <Reusables::LoginLink @label={{this.label}} 
        @auth={{this.auth}}
        @signInText={{this.signInText}}
        @iconSrc={{this.iconSrc}}
        @altText={{this.altText}} 
    />`);

    assert.dom('small').exists('Label element exists');
    assert.dom('small').hasText('For Developers:', 'Label text is correct');

    assert
      .dom('.join__link span')
      .hasText('Sign In with GitHub', 'Sign in text is correct');

    assert.dom('.login__logo').exists('Logo image exists');
    assert
      .dom('.login__logo')
      .hasAttribute(
        'src',
        'assets/icons/github-logo.png',
        'Image has correct src',
      );
    assert
      .dom('.login__logo')
      .hasAttribute('alt', 'GitHub', 'Image has correct alt text');
    assert
      .dom('.login__logo')
      .hasAttribute('height', '24px', 'Image has correct height');
    assert
      .dom('.login__logo')
      .hasAttribute('width', '24px', 'Image has correct width');
  });
});
