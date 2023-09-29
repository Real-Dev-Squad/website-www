import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render, typeIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | live-join', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the LiveJoin', async function (assert) {
    const objToCheckFunctions = {
      isInputHandler: false,
      isClickHandlerWorks: false,
      isBackHandlerWorks: false,
    };
    this.setProperties({
      role: 'host',
      name: 'Satyam',
      roomCode: '',
      inputHandler: () => {
        objToCheckFunctions.isInputHandler;
      },
      clickHandler: () => {
        objToCheckFunctions.isClickHandlerWorks;
      },
      backHandler: () => {
        objToCheckFunctions.isBackHandlerWorks;
      },
      buttonText: 'Join',
    });
    await render(hbs`
    <LiveJoin
    @role={{this.role}}
    @name={{this.name}}
    @roomCode={{this.roomCode}}
    @inputHandler={{this.inputHandler}}
    @clickHandler={{this.clickHandler}}
    @backHandler={{this.backHandler}}
    @buttonText={{this.buttonText}}
    />`);

    assert.dom('[data-test-live-join]').exists();
    assert.dom('[data-test-live-join-title]').exists();
    assert.dom('[data-test-button="live-join-back-button"]').exists();
    assert.dom('[data-test-live-join-form]').exists();
    assert.dom('[data-test-button="live-join-submit-button"]').exists();
    assert
      .dom('[data-test-button="live-join-submit-button"]')
      .containsText(this.buttonText);
    assert.dom('[data-test-input]').exists();
  });

  test('it should check all the functions trigger passed as props', async function (assert) {
    const objToCheckFunctions = {
      isInputHandler: false,
      isClickHandlerWorks: false,
      isBackHandlerWorks: false,
    };
    this.setProperties({
      role: 'host',
      name: 'Satyam',
      roomCode: '',
      inputHandler: () => {
        objToCheckFunctions.isInputHandler = true;
      },
      clickHandler: () => {
        objToCheckFunctions.isClickHandlerWorks = true;
      },
      backHandler: () => {
        objToCheckFunctions.isBackHandlerWorks = true;
      },
      buttonText: 'Join',
    });

    await render(hbs`
    <LiveJoin
    @role={{this.role}}
    @name={{this.name}}
    @roomCode={{this.roomCode}}
    @inputHandler={{this.inputHandler}}
    @clickHandler={{this.clickHandler}}
    @backHandler={{this.backHandler}}
    @buttonText={{this.buttonText}}
    />`);

    await typeIn('[data-test-input-field]', ' Bajpai');
    assert.dom('[data-test-input-field]').hasProperty('value', 'Satyam Bajpai');

    await click('[data-test-button="live-join-submit-button"]');
    assert.true(
      objToCheckFunctions.isClickHandlerWorks,
      'clickHandler is working fine!'
    );

    await click('[data-test-button="live-join-back-button"]');
    assert.true(
      objToCheckFunctions.isBackHandlerWorks,
      'backHandler is working fine!'
    );
  });

  test('it should render heading text "Join the Event"', async function (assert) {
    const objToCheckFunctions = {
      isInputHandler: assert.ok(true, 'inputHandler is working fine!'),
      isClickHandlerWorks: assert.ok(true, 'clickHandler is working fine!'),
      isBackHandlerWorks: assert.ok(true, 'backHandler is working fine!'),
    };
    this.setProperties({
      role: 'host',
      name: 'Satyam',
      roomCode: '',
      inputHandler: () => {
        objToCheckFunctions.isInputHandler;
      },
      clickHandler: () => {
        objToCheckFunctions.isClickHandlerWorks;
      },
      backHandler: () => {
        objToCheckFunctions.isBackHandlerWorks;
      },
      buttonText: 'Join',
    });

    await render(hbs`
    <LiveJoin
    @role={{this.role}}
    @name={{this.name}}
    @roomCode={{this.roomCode}}
    @inputHandler={{this.inputHandler}}
    @clickHandler={{this.clickHandler}}
    @backHandler={{this.backHandler}}
    @buttonText={{this.buttonText}}
    />`);

    assert.dom('[data-test-live-join-title]').containsText('Join the Event');
  });

  test('it should render heading text "Create a Event"', async function (assert) {
    const objToCheckFunctions = {
      isInputHandler: assert.ok(true, 'inputHandler is working fine!'),
      isClickHandlerWorks: assert.ok(true, 'clickHandler is working fine!'),
      isBackHandlerWorks: assert.ok(true, 'backHandler is working fine!'),
    };
    this.setProperties({
      role: 'host',
      name: 'Satyam',
      roomCode: '',
      inputHandler: () => {
        objToCheckFunctions.isInputHandler;
      },
      clickHandler: () => {
        objToCheckFunctions.isClickHandlerWorks;
      },
      backHandler: () => {
        objToCheckFunctions.isBackHandlerWorks;
      },
      buttonText: 'Create',
    });

    await render(hbs`
    <LiveJoin
    @role={{this.role}}
    @name={{this.name}}
    @roomCode={{this.roomCode}}
    @inputHandler={{this.inputHandler}}
    @clickHandler={{this.clickHandler}}
    @backHandler={{this.backHandler}}
    @buttonText={{this.buttonText}}
    />`);

    assert.dom('[data-test-live-join-title]').containsText('Create a Event');
  });
});
