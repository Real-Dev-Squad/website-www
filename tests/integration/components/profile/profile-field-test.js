import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | profile/profile-field', function (hooks) {
  setupRenderingTest(hooks);

  test('profile field renders', async function (assert) {
    this.setProperties({
      label: 'First Name*',
      icon_url: '/assets/icons/user.svg',
    });

    await render(
      hbs`<Profile::ProfileField @label={{this.label}} @icon_url={{this.icon_url}} />`,
    );

    assert.dom('[data-test-profile-field-label]').hasText(this.label);
    assert
      .dom('[data-test-profile-field-icon]')
      .exists()
      .hasAttribute('src', this.icon_url);
    assert.dom('[data-test-profile-field-input]').exists();
    assert.dom('[data-test-profile-field-error]').doesNotExist();
  });

  test('profile field has error state', async function (assert) {
    this.setProperties({
      showError: true,
      errorMessage: 'This field is required',
    });

    await render(
      hbs`<Profile::ProfileField @showError={{this.showError}} @errorMessage={{this.errorMessage}} />`,
    );

    assert.dom('[data-test-profile-field]').hasClass('profile-field-error');
    assert.dom('[data-test-profile-field-error]').hasText(this.errorMessage);
  });

  test('disabled profile field renders when isDeveloper is true', async function (assert) {
    this.setProperties({
      label: 'First Name*',
      icon_url: '/assets/icons/user.svg',
      isDeveloper: true,
    });

    await render(
      hbs`<Profile::ProfileField @label={{this.label}} @icon_url={{this.icon_url}} @isDeveloper={{this.isDeveloper}} />`,
    );

    assert.dom('[data-test-profile-field-label]').hasText(this.label);
    assert
      .dom('[data-test-profile-field-icon]')
      .exists()
      .hasAttribute('src', this.icon_url);
    assert
      .dom('[data-test-profile-field-input]')
      .hasProperty('disabled', true)
      .exists();
    assert.dom('[data-test-profile-field-input]').isDisabled();
    assert.dom('[data-test-profile-field-error]').doesNotExist();
  });

  test('error state updates dynamically', async function (assert) {
    this.setProperties({
      showError: false,
      label: 'First Name*',
      errorMessage: 'First name is required',
    });

    await render(
      hbs`<Profile::ProfileField @label={{this.label}} @showError={{this.showError}} @errorMessage={{this.errorMessage}} />`,
    );

    assert
      .dom('[data-test-profile-field]')
      .doesNotHaveClass('profile-field-error');
    assert.dom('[data-test-profile-field-error]').doesNotExist();

    this.set('showError', true);
    assert.dom('[data-test-profile-field]').hasClass('profile-field-error');
    assert.dom('[data-test-profile-field-error]').hasText(this.errorMessage);
  });
});
