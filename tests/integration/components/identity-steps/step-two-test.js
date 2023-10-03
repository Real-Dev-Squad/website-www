import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | identity-steps/step-two', function (hooks) {
  setupRenderingTest(hooks);

  test('stepTwo renders', async function (assert) {
    assert.expect(4);
    this.set('startHandler', () => {});

    await render(
      hbs`<IdentitySteps::StepTwo @startHandler={{this.startHandler}} />`
    );
    assert
      .dom('[data-test-getting-started-heading]')
      .hasText('Challenge Time !!');
    assert
      .dom('[data-test-getting-started-paragraph-1]')
      .hasText(
        'To add/update your profile details, link your profile service with Real Dev Squad service'
      );
    assert
      .dom('[data-test-getting-started-paragraph-2]')
      .hasText('https://github.com/identity-service/instructions.md');
    assert.dom('[data-test-button=identity-next-button]').hasText('Next');
  });
});
