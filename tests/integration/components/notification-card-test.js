import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | notification-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with title and description', async function (assert) {
    assert.expect(3);

    this.set('title', 'Test Title');
    this.set('description', 'Test Description');

    await render(hbs`
      <NotificationCard
        @title={{this.title}}
        @description={{this.description}}
      />
    `);

    assert
      .dom('[data-test-notification-card]')
      .exists('Component wrapper exists');
    assert
      .dom('[data-test-notification-title]')
      .hasText('Test Title', 'Title is rendered correctly');
    assert
      .dom('[data-test-notification-description]')
      .hasText('Test Description', 'Description is rendered correctly');
  });

  test('it renders with empty props', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <NotificationCard/>
    `);

    assert
      .dom('[data-test-notification-card]')
      .exists('Component wrapper exists even with empty props');
    assert
      .dom('[data-test-notification-title]')
      .exists('Title element exists')
      .hasText('', 'Title is empty');
    assert
      .dom('[data-test-notification-description]')
      .exists('Description element exists')
      .hasText('', 'Description is empty');
  });

  test('it updates when properties change', async function (assert) {
    assert.expect(4);

    this.set('title', 'Initial Title');
    this.set('description', 'Initial Description');

    await render(hbs`
      <NotificationCard
        @title={{this.title}}
        @description={{this.description}}
      />
    `);

    assert
      .dom('[data-test-notification-title]')
      .hasText('Initial Title', 'Initial title is rendered');
    assert
      .dom('[data-test-notification-description]')
      .hasText('Initial Description', 'Initial description is rendered');

    this.set('title', 'Updated Title');
    this.set('description', 'Updated Description');

    assert
      .dom('[data-test-notification-title]')
      .hasText('Updated Title', 'Title updates correctly');
    assert
      .dom('[data-test-notification-description]')
      .hasText('Updated Description', 'Description updates correctly');
  });
});
