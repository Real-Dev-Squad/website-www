import Component from '@glimmer/component';
import { APPS } from '../constants/urls';

export default class MoreAboutComponent extends Component {
  MEMBERS_URL = APPS.MEMBERS;
  FAQ_URL = APPS.FAQ;
}
