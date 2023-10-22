import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';
import { EVENTS_CATEGORIES } from '../constants/events-data';

// TODO: Delete/Update tests when migration changes comes out of feature flag
module('Acceptance | migration changes under feature flag', function (hooks) {
  setupApplicationTest(hooks);

  test('Migrated footer should exists when dev=true', async function (assert) {
    await visit('/');

    assert.dom('[data-events-section]').doesNotExist();
    assert.dom('[data-footer-info]').doesNotExist();
    assert.dom('[data-test-sites-title]').exists();

    assert.strictEqual(currentURL(), '/');

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
  });
});
