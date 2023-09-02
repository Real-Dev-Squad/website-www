import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-panel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(10);
    this.set('buttonClickHandler', () => {});
    this.set('toggleRoomCodeModal', () => {});
    this.set('role', 'guest');

    await render(
      hbs`<LivePanel @buttonClickHandler={{this.buttonClickHandler}} @role={{this.role}} @openRoomCodeModal={{this.toggleRoomCodeModal}}/>`
    );

    assert.dom('[data-test-live-panel]').exists();

    assert.dom(`[data-test-icon-button=leave-room]`).exists();
    assert
      .dom(`[data-test-icon-button=leave-room]`)
      .hasClass('icon-button--md');
    assert.dom(`[data-test-icon=leave-room]`).exists();
    assert.dom(`[data-test-icon-button=screen-share]`).doesNotExist();
    assert.dom(`[data-test-icon-button=copy-link]`).doesNotExist();

    this.set('role', 'host');

    assert.dom(`[data-test-icon-button=screen-share]`).exists();
    assert.dom(`[data-test-icon=screen-share]`).exists();
    assert.dom(`[data-test-icon-button=copy-link]`).exists();
    assert.dom(`[data-test-icon=copy-link]`).exists();
  });
});
