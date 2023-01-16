import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | step-one', function (hooks) {
  setupRenderingTest(hooks);

  test('step one renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<JoinSteps::StepOne />`);

    assert
      .dom('[data-test-required-heading]')
      .hasText('Fields marked with * are mandatory');
  });
});
