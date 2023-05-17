import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | icon-button', function (hooks) {
  setupRenderingTest(hooks);

  test('icon button renders', async function (assert) {
    assert.expect(8);

    this.set('id', 'testid');
    this.set('src', '/assets/icons/screen-share-icon.png');
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

    assert.dom(`[data-test-iconbtn-img=${this.id}]`).exists();
    assert.dom(`[data-test-iconbtn-img=${this.id}]`).hasAttribute('src');
    assert.dom(`[data-test-iconbtn-img=${this.id}]`).hasAttribute('alt');
    assert.strictEqual(
      document
        .querySelector(`[data-test-iconbtn-img=${this.id}]`)
        .getAttribute('src'),
      this.src,
      'source is same!'
    );
    assert.strictEqual(
      document
        .querySelector(`[data-test-iconbtn-img=${this.id}]`)
        .getAttribute('alt'),
      this.id,
      'alt attribute is same!'
    );

    await click(`[data-test-icon-button=${this.id}]`);
  });
});
