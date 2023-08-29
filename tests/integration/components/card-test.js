import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Card />`);
    assert.dom('.card__reusable').exists();
    assert.dom('.card__reusable').hasText('');
    assert.dom(this.element).hasText('');
    await render(hbs`
      <Card>
        template block text
      </Card>
    `);
    assert.dom('.card__reusable').hasText('template block text');
  });
});
