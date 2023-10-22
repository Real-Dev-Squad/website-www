import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
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

  test('it should open the modal when click on end event', async function (assert) {
    const objToCheckFunctions = {
      isOpenWarningModalWorks: false,
    };
    this.set('buttonClickHandler', () => {});
    this.set('toggleRoomCodeModal', () => {});
    this.set('toggleWarningModal', () => {
      objToCheckFunctions.isOpenWarningModalWorks = true;
    });
    this.set('role', 'host');

    await render(
      hbs`<LivePanel 
      @buttonClickHandler={{this.buttonClickHandler}} 
      @role={{this.role}} 
      @openRoomCodeModal={{this.toggleRoomCodeModal}}
      @openWarningModal={{this.toggleWarningModal}}
      />`
    );

    assert.dom(`[data-test-icon=leave-room]`).exists();

    await click(`[data-test-icon=leave-room]`);

    assert.true(
      objToCheckFunctions.isOpenWarningModalWorks,
      'Warning modal works fine'
    );
  });
});
