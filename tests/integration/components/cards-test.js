import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | cards', function (hooks) {
  setupRenderingTest(hooks);

  test('cards renders', async function (assert) {
    await render(hbs`<Cards />`);

    assert.dom('[data-test-title]').hasText('Why you should consider joining?');
    assert.dom('[data-test-modal-backdrop]');
    assert.dom('[data-test-card]').exists({ count: 6 });
    assert.dom('[data-test-card-title]').exists({ count: 6 });
    assert.dom('[data-test-card-img]').exists({ count: 6 });
    assert.dom('[data-test-card-content]').exists({ count: 6 });
    assert.dom('[data-test-card-btn]').exists({ count: 6 });
  });

  test('modal toggling on clicking card', async function (assert) {
    await render(hbs`<Cards />`);

    assert.dom('[data-test-card-modal]').doesNotExist();
    await click('[data-test-card]');
    assert.dom('[data-test-card-modal]').exists();
    assert.dom('[data-test-modal-backdrop]').exists();
    assert.dom('[data-test-card-modal-close]').exists();
    assert.dom('[data-test-card-modal-title]').exists();
    assert.dom('[data-test-card-modal-img]').exists();
    assert.dom('[data-test-card-modal-content]').exists();
    await click('[data-test-card-modal-close]');
    assert.dom('[data-test-card-modal]').doesNotExist();
  });
});
