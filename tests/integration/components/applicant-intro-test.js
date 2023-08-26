import { module, skip } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | applicant-intro', function (hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function (assert) {
    await render(hbs`<ApplicantIntro />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ApplicantIntro>
        template block text
      </ApplicantIntro>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
