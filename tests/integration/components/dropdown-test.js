import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { click, render, select } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('dropdown renders', async function (assert) {
    assert.expect(17);

    this.set('name', 'country');
    this.set('field', 'Country');
    this.set('required', true);
    this.set('placeholder', 'Choose Your Country');
    this.set('value', 'India');
    this.set('options', ['India', 'Russia', 'USA']);
    this.set('onChange', (e) => {
      assert.ok(true, 'on change works!');
      this.value = e.target.value;
    });

    await render(hbs`
    <Reusables::Dropdown 
      @name={{this.name}}
      @field={{this.field}}
      @required={{this.required}}
      @placeHolder={{this.placeholder}}
      @value={{this.value}}
      @options={{this.options}}
      @onChange={{this.onChange}}
    />`);

    assert.dom('[data-test-dropdown]').hasClass('dropdown');

    assert.dom('[data-test-label]').hasClass('label');
    assert.dom('[data-test-label]').hasText('Country');
    assert.dom('[data-test-label]').hasAttribute('for', 'country');

    assert.dom('[data-test-required]').hasClass('required');

    assert.dom('[data-test-dropdown-field]').hasClass('dropdown__field');
    assert.dom('[data-test-dropdown-field]').hasAttribute('required');
    assert.dom('[data-test-dropdown-field]').hasAttribute('name', 'country');
    assert.dom('[data-test-dropdown-field]').hasAttribute('id', 'country');

    assert
      .dom('[data-test-dropdown-option]')
      .exists({ count: this.options.length });

    assert.dom('[data-test-dropdown-default]').hasText('Choose Your Country');
    assert.dom('[data-test-dropdown-default]').hasAttribute('disabled');
    assert.dom('[data-test-dropdown-default]').hasAttribute('selected');
    assert
      .dom('[data-test-dropdown-default]')
      .hasProperty('value', 'Choose Your Country');

    select('[data-test-dropdown-field]', 'Russia');
    await click('[data-test-dropdown-option="Russia"]');
    assert.dom('[data-test-dropdown-field]').hasValue('Russia');
    assert.strictEqual(this.value, 'Russia', 'changed correctly');
  });
});
