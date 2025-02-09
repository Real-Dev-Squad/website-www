import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | notifications', function (hooks) {
  setupRenderingTest(hooks);
  const notificationTemplate = hbs`
      <div class="notifications" data-test-notifications-container>
        {{#each this.notifications as |post|}}
          <NotificationCard @title={{post.title}} @description={{post.description}} />
        {{/each}}
      </div>
    `;
  test('it renders multiple notification cards', async function (assert) {
    assert.expect(3);

    this.set('notifications', [
      { title: 'First Post', description: 'First Description' },
      { title: 'Second Post', description: 'Second Description' },
      { title: 'Third Post', description: 'Third Description' },
    ]);

    await render(notificationTemplate);

    assert
      .dom('[data-test-notifications-container]')
      .exists('Notifications container exists');
    assert
      .dom('[data-test-post-card]')
      .exists({ count: 3 }, 'Renders correct number of notification cards');
    assert
      .dom('[data-test-post-title]')
      .exists({ count: 3 }, 'Renders correct number of titles');
  });

  test('it renders notification cards with correct content', async function (assert) {
    assert.expect(4);

    this.set('notifications', [
      { title: 'First Post', description: 'First Description' },
      { title: 'Second Post', description: 'Second Description' },
    ]);

    await render(notificationTemplate);

    const titles = this.element.querySelectorAll('[data-test-post-title]');
    const descriptions = this.element.querySelectorAll(
      '[data-test-post-description]',
    );

    assert.strictEqual(
      titles[0].textContent.trim(),
      'First Post',
      'First title renders correctly',
    );
    assert.strictEqual(
      descriptions[0].textContent.trim(),
      'First Description',
      'First description renders correctly',
    );
    assert.strictEqual(
      titles[1].textContent.trim(),
      'Second Post',
      'Second title renders correctly',
    );
    assert.strictEqual(
      descriptions[1].textContent.trim(),
      'Second Description',
      'Second description renders correctly',
    );
  });

  test('it handles empty notifications array', async function (assert) {
    assert.expect(2);

    this.set('notifications', []);

    await render(hbs`
      <div class="notifications" data-test-notifications-container>
        {{#each this.notifications as |post|}}
          <NotificationCard @title={{post.title}} @description={{post.description}} />
        {{/each}}
      </div>
    `);

    assert
      .dom('[data-test-notifications-container]')
      .exists('Notifications container exists');
    assert
      .dom('[data-test-post-card]')
      .doesNotExist('No notification cards are rendered when array is empty');
  });

  test('it updates when notifications change', async function (assert) {
    assert.expect(4);

    this.set('notifications', [
      { title: 'Initial Post', description: 'Initial Description' },
    ]);

    await render(hbs`
      <div class="notifications" data-test-notifications-container>
        {{#each this.notifications as |post|}}
          <NotificationCard @title={{post.title}} @description={{post.description}} />
        {{/each}}
      </div>
    `);

    assert
      .dom('[data-test-post-card]')
      .exists({ count: 1 }, 'Initially renders one notification card');

    this.set('notifications', [
      { title: 'Initial Post', description: 'Initial Description' },
      { title: 'New Post', description: 'New Description' },
    ]);

    assert
      .dom('[data-test-post-card]')
      .exists({ count: 2 }, 'Updates to render two notification cards');

    const titles = this.element.querySelectorAll('[data-test-post-title]');
    assert.strictEqual(
      titles[0].textContent.trim(),
      'Initial Post',
      'Original notification remains',
    );
    assert.strictEqual(
      titles[1].textContent.trim(),
      'New Post',
      'New notification is added',
    );
  });
});
