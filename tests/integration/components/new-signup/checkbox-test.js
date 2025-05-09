import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { NEW_SIGNUP_STEPS } from 'website-www/constants/new-signup';

module('Integration | Component | new-signup/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('it has a select your role label when current step is role (under dev flag)', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[5];
      },
      currentStep: 'role',
      isDevMode: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.isDevMode}}
      />`);

    assert.dom('[data-test-signup-form-label]').hasText('Select your role');
  });

  test('button should have text Submit if the current step is role (under dev flag)', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[5];
      },
      currentStep: 'role',
      isDevMode: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.isDevMode}}
      />`);

    assert.dom('[data-test-button="signup"]').exists();
    assert.dom('[data-test-button="signup"]').hasText('Submit');
  });

  test('render label and checkbox (under dev flag)', async function (assert) {
    assert.expect(10);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[5];
      },
      currentStep: 'role',
      isDevMode: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.isDevMode}}
      />`);

    assert.dom('[data-test-checkbox-label]').exists({ count: 4 });
    assert.dom('[data-test-checkbox-input]').exists({ count: 4 });

    assert.dom('[data-test-checkbox-input="developer"]').isNotChecked();
    assert.dom('[data-test-checkbox-input="designer"]').isNotChecked();
    assert.dom('[data-test-checkbox-input="maven"]').isNotChecked();
    assert.dom('[data-test-checkbox-input="productmanager"]').isNotChecked();

    assert.dom('[data-test-checkbox-label="developer"]').hasText('Developer');
    assert.dom('[data-test-checkbox-label="designer"]').hasText('Designer');
    assert.dom('[data-test-checkbox-label="maven"]').hasText('Maven');
    assert
      .dom('[data-test-checkbox-label="productmanager"]')
      .hasText('Product Manager');
  });

  test('checkbox is checked after the click', async function (assert) {
    assert.expect(4);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[5];
      },
      currentStep: 'role',
      isDevMode: true,
    });

    this.set('onChange', function (roleKey, value) {
      assert.strictEqual(
        roleKey,
        'developer',
        'onChange action called with correct roleKey',
      );
      assert.true(value, 'onChange action called with correct value');
    });

    await render(hbs`
    <NewSignup::Checkbox
      @onClick={{this.onClick}} 
      @onChange={{this.onChange}}
      @currentStep={{this.currentStep}}
      @dev={{this.isDevMode}}
    />`);

    const developerCheckbox = find('[data-test-checkbox-input="developer"]');
    assert.notOk(developerCheckbox.checked, 'Checkbox is unchecked');
    await click(developerCheckbox);
    assert.ok(developerCheckbox.checked, 'Checkbox is checked');
  });
});
