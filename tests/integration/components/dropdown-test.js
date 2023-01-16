import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('dropdown renders', async function (assert) {
    assert.expect(14);

    this.set('name', 'country');
    this.set('field', 'Country');
    this.set('required', true);
    this.set('placeholder', 'Choose Your Country');
    this.set('value', 'India');
    this.set('options', ['India', 'Russia', 'USA']);

    await render(hbs`
    <Reusables::Dropdown 
      @name={{this.name}}
      @field={{this.field}}
      @required={{this.required}}
      @placeHolder={{this.placeholder}}
      @value={{this.value}}
      @options={{this.options}}
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
      .dom('[data-test-dropdown-options]')
      .exists({ count: this.options.length });

    assert.dom('[data-test-dropdown-default]').hasText('Choose Your Country');
    assert.dom('[data-test-dropdown-default]').hasAttribute('disabled');
    assert.dom('[data-test-dropdown-default]').hasAttribute('selected');
    assert
      .dom('[data-test-dropdown-default]')
      .hasProperty('value', 'Choose Your Country');
  });
});
