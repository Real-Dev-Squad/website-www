import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('navbar elements renders', async function (assert) {
    this.setProperties({
      isLoggedIn: false,
    });

    await render(hbs`
      <Navbar @isLoggedIn={{this.isLoggedIn}}/>
    `);

    assert.dom('[data-test-home]').hasText('Home');
    assert
      .dom('[data-test-home]')
      .hasAttribute('href', 'https://realdevsquad.com/');
    assert.dom('[data-test-welcome]').hasText('Welcome');
    assert
      .dom('[data-test-welcome]')
      .hasAttribute('href', 'https://welcome.realdevsquad.com/');
    assert.dom('[data-test-events]').hasText('Events');
    assert
      .dom('[data-test-events]')
      .hasAttribute('href', 'https://realdevsquad.com/events.html/');
    assert.dom('[data-test-members]').hasText('Members');
    assert
      .dom('[data-test-members]')
      .hasAttribute('href', 'https://members.realdevsquad.com/');
    assert.dom('[data-test-crypto]').hasText('Crypto');
    assert
      .dom('[data-test-crypto]')
      .hasAttribute('href', 'https://crypto.realdevsquad.com/');
    assert.dom('[data-test-status]').hasText('Status');
    assert
      .dom('[data-test-status]')
      .hasAttribute('href', 'https://status.realdevsquad.com/');

    assert.dom('[data-test-login-btn]').exists();
    assert.dom('[data-test-login-btn]').hasText('Sign In with GitHub');
    //TODO: Fix this asset path
    assert
      .dom('[data-test-login-btn-img]')
      .hasProperty('src', 'http://localhost:4200/assets/icons/github-logo.png');
  });

  test('navbar renders when user logged in', async function (assert) {
    this.setProperties({
      firstName: 'John',
      profilePicture: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      isLoggedIn: true,
    });

    await render(hbs`
      <Navbar
        @firstName={{this.firstName}}
        @profilePicture={{this.profilePicture}}
        @isLoggedIn={{this.isLoggedIn}}
      />
    `);

    assert.dom('[data-test-user-name]').hasText('Hello, John');
    assert
      .dom('[data-test-user-image]')
      .hasAttribute(
        'src',
        'https://avatars.githubusercontent.com/u/12345678?v=4'
      );
    assert.dom('[data-test-icon]').exists();
  });

  test('toggle navbar menu in mobile view', async function (assert) {
    await render(hbs`<Navbar />`);

    assert.dom('[data-test-toggle-button]').exists();
    assert.dom('[data-test-nav-menu]').exists();

    await click('[data-test-toggle-button]');
    assert.dom('[data-test-nav-menu]').doesNotHaveClass('active');
    await click('[data-test-toggle-button]');
    assert.dom('[data-test-nav-menu]').hasClass('nav__menu');
  });

  test('toggle dropdown menu', async function (assert) {
    this.setProperties({
      firstName: 'John',
      profilePicture: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      isLoggedIn: true,
    });

    await render(hbs`
      <Navbar 
        @firstName={{this.firstName}}
        @profilePicture={{this.profilePicture}}
        @isLoggedIn={{this.isLoggedIn}}
      />
    `);

    assert.dom('[data-test-dropdown]').doesNotHaveClass('active-menu');

    await click('[data-test-dropdown-toggle]');
    assert.dom('[data-test-dropdown]').hasClass('menu');
    assert.dom('[data-test-profile]').hasText('My Profile');
    assert
      .dom('[data-test-profile]')
      .hasAttribute('href', 'https://my.realdevsquad.com/');
    assert.dom('[data-test-signout]').exists();
    assert.dom('[data-test-]').hasText('Sign Out');

    await click('[data-test-dropdown-toggle]');
    assert.dom('[data-test-dropdown]').doesNotHaveClass('active-menu');
  });
});
