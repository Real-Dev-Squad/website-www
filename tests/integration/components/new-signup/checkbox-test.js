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
      dev: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.dev}}
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
      dev: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.dev}}
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
      dev: true,
    });

    await render(hbs`
      <NewSignup::Checkbox
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
        @dev={{this.dev}}
      />`);

    assert.dom('.checkbox-label').exists({ count: 4 });
    assert.dom('.checkbox-input').exists({ count: 4 });

    assert.dom('.checkbox-input[name="developer"]').isNotChecked();
    assert.dom('.checkbox-input[name="designer"]').isNotChecked();
    assert.dom('.checkbox-input[name="maven"]').isNotChecked();
    assert.dom('.checkbox-input[name="productmanager"]').isNotChecked();

    assert.dom('.checkbox-label:nth-child(1)').hasText('Developer');
    assert.dom('.checkbox-label:nth-child(2)').hasText('Designer');
    assert.dom('.checkbox-label:nth-child(3)').hasText('Maven');
    assert.dom('.checkbox-label:nth-child(4)').hasText('Product Manager');
  });

  test('checkbox is checked after the click', async function (assert) {
    assert.expect(4);

    this.setProperties({
      onClick: function () {
        this.currentStep = NEW_SIGNUP_STEPS[5];
      },
      currentStep: 'role',
      dev: true,
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
      @dev={{this.dev}}
    />`);

    const developerCheckbox = find('.checkbox-input[name="developer"]');
    assert.notOk(developerCheckbox.checked, 'Checkbox is unchecked');
    await click(developerCheckbox);
    assert.ok(developerCheckbox.checked, 'Checkbox is checked');
  });
});
