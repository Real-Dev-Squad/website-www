import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { ABOUT } from '../../constants/urls';

module('Integration | Component | more-about', function (hooks) {
  setupRenderingTest(hooks);

  test('more about component renders', async function (assert) {
    assert.expect(8);

    await render(hbs`<MoreAbout />`);

    assert.dom('[data-test-note]').doesNotExist();
    assert.dom('[data-test-members-link]').doesNotExist();
    assert.dom('[data-test-faq-link]').doesNotExist();
    assert.dom('[data-test-note-image]').doesNotExist();

    assert
      .dom('[data-test-video-title]')
      .hasText('Check out what Real Dev Squad is :');
    assert.dom('[data-test-video]').hasAttribute('src', ABOUT.VIDEO);
    assert
      .dom('[data-test-video]')
      .hasAttribute('title', 'Real Dev Squad | About Video');
    assert
      .dom('[data-test-video]')
      .hasAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      );
  });
});
