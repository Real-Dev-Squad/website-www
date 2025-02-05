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

    assert.dom('.new__message__box').exists('Component wrapper exists');
    assert
      .dom('.text__title')
      .hasText('Test Title', 'Title is rendered correctly');
    assert
      .dom('.text__description')
      .hasText('Test Description', 'Description is rendered correctly');
  });

  test('it renders with empty props', async function (assert) {
    assert.expect(5);

    await render(hbs`
      <NotificationCard
        @title={{null}}
        @description={{null}}
      />
    `);

    assert
      .dom('.new__message__box')
      .exists('Component wrapper exists even with empty props');
    assert
      .dom('.text__title')
      .exists('Title element exists')
      .hasText('', 'Title is empty');
    assert
      .dom('.text__description')
      .exists('Description element exists')
      .hasText('', 'Description is empty');
  });

  test('it has the correct structure', async function (assert) {
    assert.expect(4);

    await render(hbs`
      <NotificationCard
        @title="Test"
        @description="Test"
      />
    `);

    assert.dom('.new__message__box__alert').exists('Alert container exists');
    assert.dom('.info__tab.tip__icon__alert').exists('Icon container exists');
    assert.dom('.info__tab.tip__icon__alert i').exists('Icon element exists');
    assert.dom('.tip__box__alert').exists('Content container exists');
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
      .dom('.text__title')
      .hasText('Initial Title', 'Initial title is rendered');
    assert
      .dom('.text__description')
      .hasText('Initial Description', 'Initial description is rendered');

    this.set('title', 'Updated Title');
    this.set('description', 'Updated Description');

    assert
      .dom('.text__title')
      .hasText('Updated Title', 'Title updates correctly');
    assert
      .dom('.text__description')
      .hasText('Updated Description', 'Description updates correctly');
  });
});
