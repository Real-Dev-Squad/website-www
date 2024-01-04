import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { CARDS_DATA } from '../../constants/cards-data';

module('Integration | Component | cards', function (hooks) {
  setupRenderingTest(hooks);

  test('cards renders', async function (assert) {
    assert.expect(32);

    await render(hbs`<Cards />`);

    assert.dom('[data-test-title]').hasText('Why you should consider joining?');
    assert.dom('[data-test-modal-backdrop]').hasStyle({ display: 'none' });
    CARDS_DATA.forEach((card) => {
      assert.dom(`[data-test-card=${card.id}]`).exists();
      assert.dom(`[data-test-card-title=${card.id}]`).hasText(card.title);
      assert.dom(`[data-test-card-img=${card.id}]`).exists();
      assert.dom(`[data-test-card-content=${card.id}]`).hasText(card.content);
      assert.dom(`[data-test-card-btn=${card.id}]`).hasText('Read More');
    });
  });

  test('modal toggling on clicking card', async function (assert) {
    assert.expect(10);
    await render(hbs`<Cards />`);

    assert.dom('[data-test-card-modal]').doesNotExist();
    assert.dom('[data-test-modal-backdrop]').hasStyle({ display: 'none' });

    await click('[data-test-card]');
    assert.dom('[data-test-card-modal]').exists();
    assert.dom('[data-test-modal-backdrop]').hasStyle({ display: 'block' });
    assert.dom('[data-test-card-modal-close]').exists();
    assert.dom('[data-test-card-modal-title]').exists();
    assert.dom('[data-test-card-modal-img]').exists();
    assert.dom('[data-test-card-modal-content]').exists();

    await click('[data-test-card-modal-close]');
    assert.dom('[data-test-card-modal]').doesNotExist();
    assert.dom('[data-test-modal-backdrop]').hasStyle({ display: 'none' });
  });
});
