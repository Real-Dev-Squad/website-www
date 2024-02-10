import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { nonSuperUserData, superUserData } from '../../constants/users-data';

module('Integration | Component | debug-grids', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'service:fastboot',
      class extends EmberObject {
        isFastBoot = false;
      },
    );

    this.owner.register(
      'service:login',
      class extends EmberObject {
        isLoading = false;
        isLoggedIn = true;
        userData = superUserData;
      },
    );
  });

  test('it renders user data when authenticated', async function (assert) {
    await render(hbs`<DebugGrids />`);

    assert.dom('[data-test-debug-grids]').exists();
    assert.dom('[data-test-debug-profile]').exists();
    assert.dom('[data-test-debug-social]').exists();
    assert.dom('[data-test-debug-user]').exists();
    assert.dom('[data-test-debug-features]').exists();

    assert
      .dom('[data-test-debug-image]')
      .exists()
      .hasAttribute('src', superUserData.picture.url);
    assert
      .dom('[data-test-debug-name]')
      .hasText(`${superUserData.first_name} ${superUserData.last_name}`);
    assert
      .dom('[data-test-debug-social-id="Twitter Id"]')
      .hasText(`Twitter Id: ${superUserData.twitter_id ?? 'N/A'}`);
    assert
      .dom('[data-test-debug-social-id="Linkedin Id"]')
      .hasText(`Linkedin Id: ${superUserData.linkedin_id}`);
    assert
      .dom('[data-test-debug-user-data="Username"]')
      .hasText(`Username: ${superUserData.username}`);
    assert
      .dom('[data-test-debug-user-data="Website"]')
      .hasText(`Website: ${superUserData.website}`);
    assert
      .dom('[data-test-debug-role="super_user"]')
      .hasText(`super_user: ${superUserData.roles.super_user}`);
    assert.dom('[data-test-debug-feature-flags]').hasText('dev');
    assert
      .dom('[data-test-debug-superuser-indicator]')
      .hasClass('debug__superuser-indicator--active');
    assert
      .dom('[data-test-debug-superuser-message]')
      .hasText(
        `You're a super user. Remember, with great power comes great responsibilities!`,
      );
    assert.dom('[data-test-debug-apply-privileges-button]').exists();
  });

  test('non superuser', async function (assert) {
    this.owner.register(
      'service:login',
      class extends EmberObject {
        isLoading = false;
        isLoggedIn = true;
        userData = nonSuperUserData;
      },
    );

    await render(hbs`<DebugGrids />`);

    assert.dom('[data-test-debug-grids]').exists();

    assert
      .dom('[data-test-debug-role="super_user"]')
      .hasText(`super_user: ${nonSuperUserData.roles.super_user}`);
    assert
      .dom('[data-test-debug-superuser-indicator]')
      .doesNotHaveClass('debug__superuser-indicator--active');
    assert
      .dom('[data-test-debug-superuser-message]')
      .hasText(`You're not a super user.`);
    assert.dom('[data-test-debug-apply-privileges-button]').doesNotExist();
  });

  test('it shows error message when authentication fails', async function (assert) {
    this.owner.register(
      'service:login',
      class extends EmberObject {
        isLoading = false;
        isLoggedIn = false;
      },
    );

    await render(hbs`<DebugGrids />`);

    assert.dom('[data-test-debug-grids]').doesNotExist();
    assert.dom('[data-test-unauthenticated]').exists();
  });
});
