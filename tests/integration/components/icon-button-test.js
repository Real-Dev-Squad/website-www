import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | icon-button', function (hooks) {
  setupRenderingTest(hooks);

  test('icon button renders', async function (assert) {
    assert.expect(4);

    this.set('id', 'testid');
    this.set('class', 'test-class');
    this.set('buttonClickHandler', () => {
      assert.ok(true, 'Icon button has been clicked!');
    });

    await render(hbs`
      <Reusables::IconButton
        @id={{this.id}}
        @src={{this.src}}
        @class={{this.class}}
        @onClick={{this.buttonClickHandler}}
    />`);

    assert.dom(`[data-test-icon-button=${this.id}]`).exists();
    assert.dom(`[data-test-icon-button=${this.id}]`).hasClass(this.class);

    assert.dom(`[data-test-icon=${this.id}]`).exists();

    await click(`[data-test-icon-button=${this.id}]`);
  });
});
