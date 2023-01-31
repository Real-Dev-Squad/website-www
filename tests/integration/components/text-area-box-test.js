import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, typeIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | text-area-box', function (hooks) {
  setupRenderingTest(hooks);

  test('textarea renders', async function (assert) {
    assert.expect(12);

    this.set('name', 'why-rds');
    this.set('field', 'Why RDS?');
    this.set('placeHolder', 'Why RDS?');
    this.set('required', true);
    this.set('value', 'Hello, I am textarea');
    this.set('onInput', (e) => {
      this.value = e.target.value;
    });

    await render(hbs`
    <Reusables::TextAreaBox 
      @name={{this.name}}
      @field={{this.field}}
      @placeHolder={{this.placeHolder}}
      @required={{true}}
      @value={{this.value}} 
      @onInput={{this.onInput}}
    />`);

    assert.dom('[data-test-textarea]').hasClass('textarea-box');

    assert.dom('[data-test-label]').hasClass('label');
    assert.dom('[data-test-label]').hasAttribute('for', 'why-rds');
    assert.dom('[data-test-label]').hasText('Why RDS?');

    assert.dom('[data-test-required]').hasClass('required');

    assert.dom('[data-test-textarea-field]').hasClass('textarea__field');
    assert.dom('[data-test-textarea-field]').hasAttribute('required');
    assert.dom('[data-test-textarea-field]').hasAttribute('name', 'why-rds');
    assert.dom('[data-test-textarea-field]').hasAttribute('id', 'why-rds');
    assert
      .dom('[data-test-textarea-field]')
      .hasProperty('placeholder', 'Why RDS?');
    assert
      .dom('[data-test-textarea-field]')
      .hasProperty('value', 'Hello, I am textarea');

    await typeIn('[data-test-textarea-field]', ' and I am changing!');
    assert.strictEqual(
      this.value,
      'Hello, I am textarea and I am changing!',
      'on input working!'
    );
  });
});
