import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { click, render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | user-status-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('modal is visible if showModal is true', async function (assert) {
    this.setProperties({
      updateStatus: () => {},
      toggleUserStateModal: () => {},
      newStatus: 'ACTIVE',
      showUserStateModal: true,
    });
    await render(hbs`
      <UserStatusModal
          @newStatus={{this.newStatus}}
          @showUserStateModal={{this.showUserStateModal}}
          @toggleUserStateModal={{this.toggleUserStateModal}}
          @updateStatus={{this.updateStatus}}
      />
    `);
    assert.dom('.status-modal').exists();
    assert.dom('.modal__close').exists();
    assert.dom('.modal__close').hasProperty('button');
  });

  test('modal is not visible if showModal is false', async function (assert) {
    this.setProperties({
      updateStatus: () => {},
      toggleUserStateModal: () => {},
      newStatus: 'ACTIVE',
      showUserStateModal: false,
    });
    await render(hbs`
      <UserStatusModal
          @newStatus={{this.newStatus}}
          @showUserStateModal={{this.showUserStateModal}}
          @toggleUserStateModal={{this.toggleUserStateModal}}
          @updateStatus={{this.updateStatus}}
      />
    `);
    assert.dom('.status-modal').doesNotExist();
    assert.dom('.modal__close').doesNotExist();
  });

  test('payload contains relevant data when status is changed to OOO', async function (assert) {
    assert.expect(6);
    this.setProperties({
      newStatus: 'OOO',
      showUserStateModal: true,
      toggleUserStateModal: () => {
        this.set('showUserStateModal', !this.showUserStateModal);
      },
      updateStatus: (statusPayLoad) => {
        const {
          currentStatus: { state, from, until, message, updatedAt },
        } = statusPayLoad;
        console.log('Payload:', JSON.stringify(statusPayLoad, null, 2));
        assert.strictEqual(state, 'OOO', 'New state is present in the payload');
        assert.strictEqual(
          message,
          'OOO due to Bad Health',
          'Message is present in the payload',
        );
        assert.strictEqual(
          typeof from,
          'number',
          'From is a numeric timestamp',
        );
        assert.strictEqual(
          typeof until,
          'number',
          'Until is a numeric timestamp',
        );
        assert.strictEqual(
          typeof updatedAt,
          'number',
          'UpdatedAt is a numeric timestamp',
        );
      },
    });
    await render(hbs`
      <UserStatusModal 
        @showUserStateModal={{this.showUserStateModal}}
        @newStatus={{this.newStatus}}
        @toggleUserStateModal={{this.toggleUserStateModal}}
        @updateStatus={{this.updateStatus}}
      />
    `);

    assert.dom('[data-test-modal]').exists();
    await fillIn('[data-test-date-picker-from]', '2025-01-05');
    await fillIn('[data-test-date-picker-until]', '2025-01-10');
    await fillIn('[data-test-textarea-reason]', 'OOO due to Bad Health');
    await click('.modal__submit');
  });

  test('modal is closed on click of close button', async function (assert) {
    this.setProperties({
      newStatus: 'ACTIVE',
      showUserStateModal: true,
      toggleUserStateModal: () => {
        this.set('showUserStateModal', !this.showUserStateModal);
      },
    });
    await render(hbs`
      <UserStatusModal
          @newStatus={{this.newStatus}}
          @showUserStateModal={{this.showUserStateModal}}
          @toggleUserStateModal={{this.toggleUserStateModal}}
      />
    `);
    assert.dom('.status-modal').exists();
    assert.dom('.modal__close').exists();
    await click('.modal__close');
    assert.dom('.status-modal').doesNotExist();
  });
});
