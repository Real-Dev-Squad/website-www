import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';

module('Integration | Component | more-about', function (hooks) {
  setupRenderingTest(hooks);
  
  test('more about component renders', async function (assert) {
    await render(hbs`<MoreAbout />`);

    assert
      .dom('[data-test-note]')
      .hasText(
        'To know how this page is getting developed, join our Discord Channel. Contact one of our existing members for the invitation link or check our FAQ section.'
      );
    assert
      .dom('[data-test-members-link]')
      .hasAttribute('href', 'https://members.realdevsquad.com/');
    assert
      .dom('[data-test-faq-link]')
      .hasAttribute('href', 'https://welcome.realdevsquad.com/faq.html');
    assert.dom('[data-test-note-image]').exists();
    assert
      .dom('[data-test-video-title]')
      .hasText('Check out what Real Dev Squad is :');
    assert.dom('[data-test-video]').exists();
  });
});
