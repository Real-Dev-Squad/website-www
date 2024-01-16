import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | survey-page', function (hooks) {
  setupRenderingTest(hooks);

  test('Events::SurveyPage renders', async function (assert) {
    await render(hbs`<Events::SurveyPage />`);

    assert.ok(true, 'survey page tests');
  });
});
