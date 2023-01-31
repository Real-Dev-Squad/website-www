import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | step-two', function (hooks) {
  setupRenderingTest(hooks);

  test('step two renders', async function (assert) {
    assert.expect(2);

    this.set('isValid', 'isValidVal');
    this.set('setIsPreValid', () => {
      assert.ok(true, 'setIsPreValid works!');
    });
    this.set('setIsValid', () => {
      assert.ok(true, 'setIsValid works!');
    });

    await render(hbs`
    <JoinSteps::StepTwo
    @setIsPreValid={{this.setIsPreValid}}
    @isValid={{this.isValid}}
    @setIsValid={{this.setIsValid}}
     />`);

    assert
      .dom('[data-test-required-heading]')
      .hasText('Fields marked with * are mandatory');
  });
});
