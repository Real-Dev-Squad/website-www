import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { set } from '@ember/object';
import { nonSuperUserData, superUserData } from '../../constants/users-data';

module('Integration | Component | debug-grids', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.owner.register(
      'service:fastboot',
      class extends EmberObject {
        isFastBoot = false;
      },
    );
  });

  test('it renders user data when authenticated', async function (assert) {
    set(this.owner.lookup('service:store'), 'findRecord', () => {
      return superUserData;
    });

    await render(hbs`<DebugGrids />`);

    assert.dom('[data-test-debug-grids]').exists();
    assert.dom('[data-test-debug-profile]').exists();
    assert.dom('[data-test-debug-social]').exists();
    assert.dom('[data-test-debug-user]').exists();
    assert.dom('[data-test-debug-features]').exists();

    assert
      .dom('[data-test-debug-image]')
      .exists()
      .hasAttribute(
        'src',
        'https://res.cloudinary.com/realdevsquad/image/upload/mock-image.png',
      );
    assert.dom('[data-test-debug-name]').hasText('John Doe');
    assert
      .dom('[data-test-debug-social-id="Twitter Id"]')
      .hasText('Twitter Id: N/A');
    assert
      .dom('[data-test-debug-social-id="Linkedin Id"]')
      .hasText('Linkedin Id: https://www.linkedin.com/in/john-doe/');
    assert
      .dom('[data-test-debug-user-data="Username"]')
      .hasText('Username: johndoe');
    assert
      .dom('[data-test-debug-user-data="Website"]')
      .hasText('Website: https://johndoe.app/');
    assert
      .dom('[data-test-debug-role="super_user"]')
      .hasText('super_user: true');
    assert.dom('[data-test-debug-feature-flags]').hasText('dev');
    assert
      .dom('[data-test-debug-superuser-indicator]')
      .hasClass('debug-features__superuser__indicator--active');
    assert
      .dom('[data-test-debug-superuser-message]')
      .hasText(
        `You're a super user. Remember, with great power comes great responsibilities!`,
      );
    assert.dom('[data-test-debug-apply-privileges-button]').exists();
  });

  test('non superuser', async function (assert) {
    set(this.owner.lookup('service:store'), 'findRecord', () => {
      return nonSuperUserData;
    });

    await render(hbs`<DebugGrids />`);

    assert.dom('[data-test-debug-grids]').exists();

    assert
      .dom('[data-test-debug-role="super_user"]')
      .hasText('super_user: false');
    assert
      .dom('[data-test-debug-superuser-indicator]')
      .doesNotHaveClass('debug-features__superuser__indicator--active');
    assert
      .dom('[data-test-debug-superuser-message]')
      .hasText(`You're not a super user.`);
    assert.dom('[data-test-debug-apply-privileges-button]').doesNotExist();
  });

  test('it shows error message when authentication fails', async function (assert) {
    set(this.owner.lookup('service:store'), 'findRecord', () => {
      return;
    });

    await render(hbs`<DebugGrids />`);

    assert.dom('[data-test-debug-grids]').doesNotExist();
    assert.dom('[data-test-debug-error-message]').exists();
  });
});
