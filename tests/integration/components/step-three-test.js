import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | step-three', function (hooks) {
  setupRenderingTest(hooks);

  test('step three renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<JoinSteps::StepThree />`);

    assert
      .dom('[data-test-required-heading]')
      .hasText('Fields marked with * are mandatory');
  });
});
