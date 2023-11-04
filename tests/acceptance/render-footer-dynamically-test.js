import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website-www/tests/helpers';

module('Acceptance | render footer dynamically', function (hooks) {
  setupApplicationTest(hooks);

  test('Should render all parts of footer when visting /?dev=true', async function (assert) {
    await visit('/?dev=true');

    assert.strictEqual(currentURL(), '/?dev=true');

    assert.dom('[data-test-events-section]').exists();
    assert.dom('[data-test-footer-info]').exists();
    assert.dom('[data-test-footer-repo-text-dev]').exists();
  });

  test('Should render only repo details in footer when visiting /live?dev=true', async function (assert) {
    await visit('/live?dev=true');

    assert.strictEqual(currentURL(), '/live?dev=true');

    assert.dom('[data-test-events-section]').doesNotExist();
    assert.dom('[data-test-footer-info]').doesNotExist();
    assert.dom('[data-test-footer-repo-text-dev]').exists();
  });

  test('Should render only repo details in footer when visiting /join?dev=true', async function (assert) {
    await visit('/join?dev=true');

    assert.strictEqual(currentURL(), '/join?dev=true');

    assert.dom('[data-test-events-section]').doesNotExist();
    assert.dom('[data-test-footer-info]').doesNotExist();
    assert.dom('[data-test-footer-repo-text-dev]').exists();
  });
});
