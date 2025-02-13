import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | notification-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with title and description', async function (assert) {
    assert.expect(2);

    this.setProperties({
      title: 'Test Title',
      description: 'Test Description',
    });

    await render(hbs`
      <NotificationCard
        @title={{this.title}}
        @description={{this.description}}
      />
    `);

    assert
      .dom('[data-test-notification-title]')
      .hasText('Test Title', 'Title is rendered correctly');
    assert
      .dom('[data-test-notification-description]')
      .hasText('Test Description', 'Description is rendered correctly');
  });

  test('it renders with empty props', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <NotificationCard/>
    `);

    assert
      .dom('[data-test-notification-title]')
      .exists('Title element exists')
      .hasText('', 'Title is empty');
    assert
      .dom('[data-test-notification-description]')
      .exists('Description element exists')
      .hasText('', 'Description is empty');
  });
});
