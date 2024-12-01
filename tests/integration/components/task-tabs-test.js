import { module, test } from 'qunit';
import { setupRenderingTest } from 'website-www/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { TASK_KEYS, TABS_TASK_STATUS_LIST } from 'website-www/constants/tasks';

module('Integration | Component | task-tabs', function (hooks) {
  setupRenderingTest(hooks);
  let DEFAULT_TASK_TYPE;

  hooks.before(function () {
    DEFAULT_TASK_TYPE = TABS_TASK_STATUS_LIST.find(
      (obj) => obj.key === TASK_KEYS.IN_PROGRESS,
    );
  });

  test('it renders', async function (assert) {
    this.setProperties({
      tabsTaskStatusList: TABS_TASK_STATUS_LIST,
      showDropDown: false,
      toggleDropDown: () => {},
      changeUserSelectedTask: () => {},
      userSelectedTaskText: '',
      showTasks: false,
      toggleTasks: () => {},
    });

    await render(hbs` <TaskTabs
    @taskStatusList={{this.tabsTaskStatusList}}
    @showDropDown={{this.showDropDown}}
    @toggleDropDown={{this.toggleDropDown}}
    @changeUserSelectedTask={{this.changeUserSelectedTask}}
    @userSelectedTaskText={{this.userSelectedTaskText}}
    @showTasks={{this.showTasks}}
    @toggleTasks={{this.toggleTasks}}
  />`);

    assert.dom('[data-test-task-tabs]').exists();

    assert
      .dom('[data-test-task-tabs]')
      .containsText(DEFAULT_TASK_TYPE.displayLabel);
  });

  test('verify active tab', async function (assert) {
    this.setProperties({
      tabsTaskStatusList: [DEFAULT_TASK_TYPE],
      showDropDown: false,
      toggleDropDown: () => {},
      changeUserSelectedTask: () => {},
      userSelectedTaskText: DEFAULT_TASK_TYPE.displayLabel,
      showTasks: false,
      toggleTasks: () => {},
    });

    await render(hbs` <TaskTabs
    @taskStatusList={{this.tabsTaskStatusList}}
    @showDropDown={{this.showDropDown}}
    @toggleDropDown={{this.toggleDropDown}}
    @changeUserSelectedTask={{this.changeUserSelectedTask}}
    @userSelectedTaskText={{this.userSelectedTaskText}}
    @showTasks={{this.showTasks}}
    @toggleTasks={{this.toggleTasks}}
  />`);

    assert
      .dom('[data-test-task-tabs-button]')
      .hasClass('task-tabs__dropdown-container__button-active');

    this.setProperties({ userSelectedTaskText: '' });

    await render(hbs` <TaskTabs
    @taskStatusList={{this.tabsTaskStatusList}}
    @showDropDown={{this.showDropDown}}
    @toggleDropDown={{this.toggleDropDown}}
    @changeUserSelectedTask={{this.changeUserSelectedTask}}
    @userSelectedTaskText={{this.userSelectedTaskText}}
    @showTasks={{this.showTasks}}
    @toggleTasks={{this.toggleTasks}}
  />`);

    assert
      .dom('[data-test-task-tabs-button]')
      .hasNoClass('task-tabs__dropdown-container__button-active');
  });
});
