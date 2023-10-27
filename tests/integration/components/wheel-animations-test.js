import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | wheel-animations', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<WheelAnimations />`);
    assert.dom(this.element).hasText('');
    assert
      .dom('[data-test-wheel-animation-section] > div')
      .exists()
      .hasClass('circle', 'div has circle class')
      .hasClass('shine', 'div has shine class');
  });

  test('it renders wheel animation, when users array is passed', async function (assert) {
    const users = [
      {
        username: '1',
        first_name: 'a',
        last_name: 'z',
        picture: { publicId: '1a' },
      },
      {
        username: '2',
        first_name: 'a',
        last_name: 'z',
        picture: { publicId: '2a' },
      },
      {
        username: '3',
        first_name: 'a',
        last_name: 'z',
        picture: { publicId: '3a' },
      },
    ];
    this.set('users', users);
    await render(hbs`
      <WheelAnimations @users={{this.users}}/>
    `);
    assert
      .dom('[data-test-wheel-animation-section]')
      .exists('Wheel animation section exists')
      .containsText('', 'Has no text');

    assert
      .dom('[data-test-wheel-animation-member-link]')
      .exists()
      .hasProperty('href', 'https://members.realdevsquad.com/1')
      .hasProperty('target', '_blank')
      .hasProperty('rel', 'noopener noreferrer');

    assert
      .dom('[data-test-wheel-animation-member-image]')
      .exists('Animation image exists')
      .hasProperty(
        'src',
        'https://res.cloudinary.com/realdevsquad/image/upload/w_150,h_150/1a'
      )
      .hasProperty('alt', 'a z');

    assert.deepEqual(
      document.querySelectorAll('[data-test-wheel-animation-member-link]')
        .length,
      3,
      '3 members links are present'
    );
    assert.deepEqual(
      document.querySelectorAll('[data-test-wheel-animation-member-image]')
        .length,
      3,
      '3 members image are present'
    );
  });

  test('it renders wheel animation with default image, when users array with no image is passed', async function (assert) {
    const users = [
      {
        username: '1',
        first_name: 'a',
        last_name: 'z',
      },
    ];
    this.set('users', users);
    await render(hbs`
      <WheelAnimations @users={{this.users}}/>
    `);

    assert
      .dom('[data-test-wheel-animation-section]')
      .exists('Wheel animation section exists');

    assert
      .dom('[data-test-wheel-animation-member-image]')
      .hasProperty('alt', 'a z');
    console.log(
      document.querySelector('[data-test-wheel-animation-member-image]')
    );

    assert.deepEqual(
      document
        .querySelector('[data-test-wheel-animation-member-image]')
        .getAttribute('src'),
      'assets/images/profile.png'
    );
  });
});
