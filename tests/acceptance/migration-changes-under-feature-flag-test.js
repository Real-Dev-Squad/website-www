import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';
import { EVENTS_CATEGORIES } from '../constants/events-data';

// TODO: Delete/Update tests when migration changes comes out of feature flag
module('Acceptance | migration changes under feature flag', function (hooks) {
  setupApplicationTest(hooks);

  test('Migrated footer should exists when dev=true', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    assert.dom('[data-test-events-section]').doesNotExist();
    assert.dom('[data-test-footer-info]').doesNotExist();
    assert.dom('[data-test-sites-title]').exists();

    await visit('/?dev=true');

    assert.strictEqual(currentURL(), '/?dev=true');

    assert.dom('[data-test-sites-title]').doesNotExist();
    assert.dom('[data-test-events-section]').exists();
    assert.dom('[data-test-events-section-header]').exists();
    for (const eventCategory in EVENTS_CATEGORIES) {
      assert.dom(`[data-test-events-category="${eventCategory}"]`).exists();
      EVENTS_CATEGORIES[eventCategory].forEach((event) => {
        assert.dom(`[data-test-events-link="${event.name}"]`).exists();
      });
    }
    assert.dom('[data-test-footer-info]').exists();
    assert.dom('[data-test-footer-info-members-link]').exists();
    assert.dom('[data-test-footer-info-faq-link]').exists();
    assert.dom('[data-test-footer-repo-text-dev]').exists();
    assert.dom('[data-test-footer-repo-link-dev]').exists();
  });
  test('Migrated Join section should exist and join button should be disabled when dev=true', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    assert.dom('[data-test-join]').exists();
    assert.dom('[data-test-join-title]').exists();
    assert.dom('[data-test-join-title]').hasText('How to Join');
    assert.dom('[data-test-join-title-highlighted]').exists();
    assert.dom('[data-test-join-title-highlighted]').hasText('Real Dev Squad');
    assert.dom('[data-test-para="1"]').exists();

    await visit('/?dev=true');

    assert.strictEqual(currentURL(), '/?dev=true');

    assert.dom('[data-test-join]').exists();
    assert.dom('[data-test-join-title]').exists();
    assert.dom('[data-test-join-title]').hasText('How can you Join?');
    assert.dom('[data-test-join-title-highlighted]').doesNotExist();
    assert.dom('[data-test-para="first"]').exists();
    assert.dom('[data-test-join-link]').exists();
    assert.dom('[data-test-join-link]').hasText('Join the Squad');
    await click('[data-test-join-link]');

    assert.strictEqual(currentURL(), '/?dev=true');
  });
});
