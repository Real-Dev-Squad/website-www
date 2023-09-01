import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click, typeIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | room-code-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(5);
    await render(hbs`<RoomCodeModal />`);

    assert.dom('[data-test-room-code-modal]').exists();
    assert.dom('[data-test-room-code-modal-heading]').exists();
    assert.dom('[data-test-icon-button=close-modal]').exists();
    assert.dom('[data-test-room-code-modal-message]').exists();
    assert.dom('[data-test-button=create-code]').exists();
  });

  test('it should open the form to create new code', async function (assert) {
    assert.expect(4);
    this.set('newCode', '');
    this.set('onInput', () => {});
    this.set('createRoomCodeHandler', () => {});

    await render(
      hbs`<RoomCodeModal 
            @newCode={{this.newCode}} 
            @onInput={{this.onInput}} 
            @createRoomCode={{this.createRoomCodeHandler}}
          />`
    );

    assert.dom('[data-test-room-code-modal-input]').doesNotExist();
    assert.dom('[data-test-button=create-new-code]').doesNotExist();

    await click('[data-test-button=create-code]');

    assert.dom('[data-test-room-code-modal-input]').exists();
    assert.dom('[data-test-button=create-new-code]').exists();
  });

  test('it should add new room code', async function (assert) {
    assert.expect(4);
    this.set('newCode', '');
    this.set('onInput', (e) => {
      this.newCode = e.target.value;
    });
    this.set('roomCodes', []);
    this.set('createRoomCodeHandler', (value, event) => {
      event.preventDefault();
      this.set('roomCodes', [{ id: 1, code: value }]);
    });

    await render(
      hbs`<RoomCodeModal 
            @roomCodes={{this.roomCodes}}
            @newCode={{this.newCode}} 
            @onInput={{this.onInput}} 
            @createRoomCode={{this.createRoomCodeHandler}}
          />`
    );

    await click('[data-test-button=create-code]');

    assert.dom('[data-test-room-code-modal-input]').exists();
    assert.dom('[data-test-button=create-new-code]').exists();

    await typeIn('[data-test-room-code-modal-input]', 'test-code');
    await click('[data-test-button=create-new-code]');

    assert.dom('[data-test-room-code-modal-message]').doesNotExist();
    assert.dom('[data-test-room-code]').exists();
  });
});
