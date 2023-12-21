import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | render footer dynamically', function (hooks) {
  setupApplicationTest(hooks);

  test('Should render all parts of footer when visting home(/)', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    assert.dom('[data-test-events-section]').exists();
    assert.dom('[data-test-footer-info]').exists();
    assert.dom('[data-test-footer-repo-text]').exists();
  });

  test('Should render only repo details in footer when visiting /live?dev=true', async function (assert) {
    await visit('/live?dev=true');

    assert.strictEqual(currentURL(), '/live?dev=true');

    assert.dom('[data-test-events-section]').doesNotExist();
    assert.dom('[data-test-footer-info]').doesNotExist();
    assert.dom('[data-test-footer-repo-text]').exists();
  });

  test('Should render only repo details in footer when visiting /join', async function (assert) {
    await visit('/join');

    assert.strictEqual(currentURL(), '/join');

    assert.dom('[data-test-events-section]').doesNotExist();
    assert.dom('[data-test-footer-info]').doesNotExist();
    assert.dom('[data-test-footer-repo-text]').exists();
  });
});
