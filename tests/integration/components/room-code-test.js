import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | room-code', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);
    await render(hbs`<RoomCode/>`);

    assert.dom('[data-test-room-code]').exists();
    assert.dom('[data-test-room-code-text]').exists();
    assert.dom('[data-test-icon-button=show-code]').exists();
    assert.dom('[data-test-icon-button=copy-code]').exists();
  });

  test('it should toggle value when click on visibility icon', async function (assert) {
    assert.expect(3);
    this.set('code', 'test-code');

    await render(hbs`<RoomCode @code={{this.code}}/>`);

    assert
      .dom('[data-test-room-code-text]')
      .hasText('***********************************');

    await click('[data-test-icon-button=show-code]');

    assert.dom('[data-test-room-code-text]').hasText('test-code');

    await click('[data-test-icon-button=show-code]');

    assert
      .dom('[data-test-room-code-text]')
      .hasText('***********************************');
  });
});
