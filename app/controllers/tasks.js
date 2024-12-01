import Controller from '@ember/controller';
import { TASK_STATUS_LIST, TABS_TASK_STATUS_LIST } from '../constants/tasks';
export default class TasksController extends Controller {
  taskStatusList = TASK_STATUS_LIST;
  tabsTaskStatusList = TABS_TASK_STATUS_LIST;
  // TODO: in next PR, add logic to handle dropdown and tasks rendering
  showDropDown = false;
  toggleDropDown = () => {
    this.showDropDown = !this.showDropDown;
  };
  changeUserSelectedTask = () => {};
  userSelectedTaskText = '';
  showTasks = false;
  toggleTasks = () => {};
}
