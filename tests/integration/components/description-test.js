import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';

module('Integration | Component | description', function (hooks) {
  setupRenderingTest(hooks);

  test('description content renders', async function (assert) {
    await render(hbs`<Description />`);

    assert.dom('[data-test-description-img]').exists();
    assert
      .dom('[data-test-description-title]')
      .hasText('What is Real Dev Squad');
    assert
      .dom('[data-test-description-content]')
      .hasText(
        'Real Dev Squad is an online non-profit open source free fun community for people in tech, mainly developers, designers, college students, or product managers, to come, learn and contribute towards building a platform for our community, that helps upskill everyone. We are an inclusive, respectful, warm, motivated and commited squad of people who constantly grow together and tackle bigger and harder challenges to ensure we become some of the best problem solvers, engineers, designers and more out there.'
      );
  });
});
