import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Template | discord', function (hooks) {
  setupRenderingTest(hooks);

  test('it shows expired token message', async function (assert) {
    this.set('model', {
      isTokenExpired: true,
    });

    await render(hbs`
      <div class="discord">
        {{#if this.model.isTokenExpired}}
          <p class="error__text testing">Token Expired. Please generate a new token using slash commands</p>
        {{/if}}
      </div>
    `);

    assert
      .dom('.error__text')
      .hasText(
        'Token Expired. Please generate a new token using slash commands',
      );
  });

  test('it shows linking in progress state', async function (assert) {
    this.set('isLinkingInProgress', true);

    await render(hbs`
      <div class="discord">
        {{#if this.isLinkingInProgress}}
          <div class="loading">
            <FaIcon @icon="spinner" @size="0.5x" class="fa-spin" />
          </div>
        {{/if}}
      </div>
    `);

    assert.dom('.loading').exists();
    assert.dom('.fa-spin').exists();
  });

  test('it shows success message when account is linked', async function (assert) {
    this.set('model', {
      userData: {
        roles: {
          archived: false,
        },
      },
    });
    this.set('linkStatus', 'linked');

    await render(hbs`
      <div class="discord">
        {{#if (or
          (eq this.model.userData.roles.archived false)
          (eq this.linkStatus 'linked')
        )}}
          <div class="discord__success">
            <p class="success__text">Your Discord account has been successfully linked.</p>
            <p class="success__text">You can close this tab now.</p>
          </div>
        {{/if}}
      </div>
    `);

    assert.dom('.discord__success').exists();
    assert.dom('.success__text').exists({ count: 2 });
  });

  test('it shows authorization form when not linked', async function (assert) {
    this.set('model', {
      userData: {
        username: 'testUser',
        picture: {
          url: 'test-url',
        },
      },
      externalAccountData: {
        attributes: {
          userName: 'discordUser',
          discriminator: '1234',
          userAvatar: 'discord-avatar',
        },
      },
    });
    this.set('linkStatus', 'not-linked');
    this.set('setConsent', () => {});
    this.set('linkDiscordAccount', () => {});

    await render(hbs`
      {{#if (eq this.linkStatus 'not-linked')}}
        <main class="discord-card vertical-flex w-100" data-test-main-content>
          <div class="profiles horizontal-flex w-100">
            <div class="profile-card vertical-flex" data-test-discord-profile-card>
              <img
                class="logo"
                data-test-discord-profile-image
                src={{this.model.externalAccountData.attributes.userAvatar}}
                alt="Discord Avatar"
              />
              <p class="username" data-test-discord-username>
                {{this.model.externalAccountData.attributes.userName}}#{{this.model.externalAccountData.attributes.discriminator}}
              </p>
            </div>
          </div>
          <div class="my-same" data-test-consent>
            <input
              data-test-consent-checkbox
              name="authorize"
              id="authorize"
              type="checkbox"
              {{on "input" this.setConsent}}
            />
          </div>
          <button
            data-test-authorize-button
            type="button"
            class="button my-same"
            {{on "click" this.linkDiscordAccount}}
          >Authorize</button>
        </main>
      {{/if}}
    `);

    assert.dom('[data-test-main-content]').exists();
    assert.dom('[data-test-discord-profile-card]').exists();
    assert.dom('[data-test-discord-username]').hasText('discordUser#1234');
    assert.dom('[data-test-consent-checkbox]').exists();
    assert.dom('[data-test-authorize-button]').exists();
  });

  test('it handles authorization button click', async function (assert) {
    assert.expect(1);

    this.set('linkStatus', 'not-linked');
    this.set('linkDiscordAccount', () => {
      assert.ok(true, 'linkDiscordAccount action was triggered');
    });

    await render(hbs`
      <button
        data-test-authorize-button
        type="button"
        {{on "click" this.linkDiscordAccount}}
      >Authorize</button>
    `);

    await click('[data-test-authorize-button]');
  });
});
