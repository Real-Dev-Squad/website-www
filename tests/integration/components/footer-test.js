import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { APPS_PROPERTIES, ABOUT_PROPERTIES } from '../../constants/footer-data';
import { SOCIAL_LINK_PROPERTIES } from '../../constants/social-data';
import { ABOUT } from '../../constants/urls';

module('Integration | Component | footer', function (hooks) {
  setupRenderingTest(hooks);

  test('footer renders', async function (assert) {
    assert.expect(29);

    await render(hbs`<Footer />`);

    assert.dom('[data-test-sites-title]').hasText('Sites');
    assert.dom('[data-test-about-title]').hasText('About');
    assert.dom('[data-test-social-media-title]').hasText('Social Media');
    assert.dom('[data-test-newsletter-title]').hasText('Newsletter');
    assert.dom('[data-test-underline]').exists({ count: 4 });

    APPS_PROPERTIES.forEach((link) => {
      assert
        .dom(`[data-test-sites-link="${link.name}"]`)
        .hasAttribute('href', link.url);
    });

    ABOUT_PROPERTIES.forEach((link) => {
      assert.dom(`[data-test-about-link="${link.name}"]`).hasText(link.name);
    });

    SOCIAL_LINK_PROPERTIES?.forEach((link) => {
      assert
        .dom(`[data-test-social-link=${link.title}]`)
        .hasAttribute('href', link.url);

      assert.dom(`[data-test-social-icon=${link.title}]`).exists();
    });

    assert.dom('[data-footer-repo-github-img]').exists();
    assert
      .dom('[data-footer-repo-text]')
      .hasText(
        'The contents of the website are deployed from this open sourced repo'
      );
    assert
      .dom('[data-footer-repo-link]')
      .hasAttribute('href', ABOUT.REPOSITORY);

    assert
      .dom('[data-test-newsletter-input]')
      .hasAttribute('placeholder', 'Enter your email');
    assert.dom('[data-test-newsletter-button]').exists();
    assert.dom('[data-test-newsletter-button-icon]').exists();
  });
});
