import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

// TODO: Delete/Update tests when migration changes comes out of feature flag
module('Acceptance | migration changes under feature flag', function (hooks) {
  setupApplicationTest(hooks);

  test('checking for changes under fearture flag', async function (assert) {
    await visit('/');

    assert.dom('[data-events-section]').doesNotExist();
    assert.dom('[data-footer-info]').doesNotExist();
    assert.dom('[data-test-sites-title]').exists();

    assert.strictEqual(currentURL(), '/');

    await visit('/?dev=true');

    assert.dom('[data-test-sites-title]').doesNotExist();
    assert.dom('[data-events-section]').exists();
    assert.dom('[data-events-section-header]').exists();
    assert.dom('[data-events-category="Upcoming Features"]').exists();
    assert.dom('[data-events-link="Art Feature"]').exists();
    assert.dom('[data-events-category="Upcoming Events"]').exists();
    assert.dom('[data-events-link="APIs made Easier"]').exists();
    assert.dom('[data-events-category="Past Events"]').exists();
    assert.dom('[data-events-link="Dynamic Programming"]').exists();
    assert.dom('[data-events-link="NodeJS Workshop Part I"]').exists();
    assert.dom('[data-events-link="Web-Mini-Conf-July-2020"]').exists();
    assert.dom('[data-events-link="React Hooks Session"]').exists();
    assert.dom('[data-events-link="SSR the right way"]').exists();
    assert.dom('[data-footer-info]').exists();
    assert.dom('[data-footer-info-members-link]').exists();
    assert.dom('[data-footer-info-faq-link]').exists();
    assert.dom('[data-footer-repo-text-dev]').exists();
    assert.dom('[data-footer-repo-link-dev]').exists();

    assert.strictEqual(currentURL(), '/?dev=true');
  });
});
