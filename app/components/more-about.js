import Component from '@glimmer/component';
import { APPS, ABOUT } from '../constants/urls';

export default class MoreAboutComponent extends Component {
  MEMBERS_URL = APPS.MEMBERS;
  FAQ_URL = ABOUT.FAQ;
}
