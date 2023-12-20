import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { SOCIAL_LINK_PROPERTIES } from '../../constants/social-data';

module('Integration | Component | hero-section', function (hooks) {
  setupRenderingTest(hooks);

  test("old hero-section content doesn't renders", async function (assert) {
    assert.expect(16);

    await render(hbs`<HeroSection />`);

    assert.dom('[data-test-logo]').doesNotExist();
    assert.dom('[data-test-subtitle]').doesNotExist();
    assert.dom('[data-test-title]').doesNotExist();
    assert.dom('[data-test-social-link-dev]').doesNotExist();
    assert.dom('[data-test-social-icon-dev]').doesNotExist();

    SOCIAL_LINK_PROPERTIES.forEach((social) => {
      assert.dom(`[data-test-social-link-dev=${social.title}]`).doesNotExist();
      assert.dom(`[data-test-social-icon-dev=${social.title}]`).doesNotExist();
    });

    assert.dom('[data-test-vertical-separators-dev]').doesNotExist();
    assert.dom('[data-test-round-separators]').doesNotExist();
    assert.dom('[data-test-welcome-img]').doesNotExist();
  });

  test('new hero-section content renders', async function (assert) {
    assert.expect(19);

    await render(hbs`<HeroSection />`);

    assert.dom('[data-test-main-welcome-title]').exists();
    assert.dom('[data-test-main-hero-img]').exists();
    assert.dom('[data-test-main-container]').exists();
    assert.dom('[data-test-social-link]').exists();
    assert.dom('[data-test-social-icon]').exists();

    SOCIAL_LINK_PROPERTIES.forEach((social) => {
      assert
        .dom(`[data-test-social-link=${social.title}]`)
        .hasAttribute('href', `${social.url}`);

      assert.dom(`[data-test-social-link=${social.title}]`).exists();
      assert.dom(`[data-test-social-icon=${social.title}]`).exists();
    });

    assert.dom('[data-test-vertical-separators]').exists({ count: 3 });
    assert.dom('[data-test-welcome-img]').doesNotExist();
  });
});
