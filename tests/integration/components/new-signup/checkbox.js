import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | new-signup/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('renders checkboxes and triggers onChange when checked', async function (assert) {
    assert.expect(2);

    this.setProperties({
      currentStep: 'role',
      isButtonDisabled: false,
      isLoading: false,
      onChange: (name, value) => {
        assert.strictEqual(name, 'developer');
        assert.true(value, 'Checkbox should be checked');
      },
      onClick: () => {},
    });

    await render(hbs`
      <NewSignup::Checkbox 
        @currentStep={{this.currentStep}} 
        @isButtonDisabled={{this.isButtonDisabled}} 
        @isLoading={{this.isLoading}} 
        @onChange={{this.onChange}} 
        @onClick={{this.onClick}} 
      />
    `);

    await click('input[name="developer"]');
  });

  test('checkbox is checked when role is selected', async function (assert) {
    this.setProperties({
      currentStep: 'role',
      isButtonDisabled: false,
      isLoading: false,
      selectedRoles: ['designer'],
      onChange: () => {},
      onClick: () => {},
    });

    await render(hbs`
      <NewSignup::Checkbox 
        @currentStep={{this.currentStep}} 
        @isButtonDisabled={{this.isButtonDisabled}} 
        @isLoading={{this.isLoading}} 
        @onChange={{this.onChange}} 
        @onClick={{this.onClick}} 
        @selectedRoles={{this.selectedRoles}}
      />
    `);

    assert.dom('input[name="designer"]').isChecked();
    assert.dom('input[name="developer"]').isNotChecked();
  });
});
