import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity/get-started', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the get started component correctly', async function (assert) {
    this.set('setState', () => {});
    await render(hbs`
      <Identity::GetStarted @setState={{this.setState}}/>
    `);

    assert.dom('[data-test-getStarted-heading]').exists();
    assert
      .dom('[data-test-getStarted-heading]')
      .hasText('Qualification Criteria');

    assert.dom('[data-test-getStarted-desc]').exists();
    assert
      .dom('[data-test-getStarted-desc]')
      .containsText('To update your profile details');
    assert
      .dom('[data-test-getStarted-desc] a')
      .hasAttribute(
        'href',
        'https://github.com/Real-Dev-Squad/sample-profile-service',
      );

    assert.dom('[data-test-getStarted-button]').exists();
    assert.dom('[data-test-getStarted-button]').hasText('Get Started');
  });

  test('clicking get started button triggers setState action with step1', async function (assert) {
    assert.expect(1);

    this.set('setState', (state) => {
      assert.strictEqual(
        state,
        'step1',
        'setState action is called with step1',
      );
    });

    await render(hbs`
      <Identity::GetStarted @setState={{this.setState}}/>
    `);

    await click('[data-test-getStarted-button]');
  });
});
