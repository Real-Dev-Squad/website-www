import Component from '@glimmer/component';
import { ABOUT } from '../constants/urls';
import { APPS_PROPERTIES, ABOUT_PROPERTIES } from '../constants/footer-data';
import { SOCIAL_LINK_PROPERTIES } from '../constants/social-data';

export default class FooterComponent extends Component {
  REPOSITORY_URL = ABOUT.REPOSITORY;
  APPS_PROPERTIES = APPS_PROPERTIES;
  ABOUT_PROPERTIES = ABOUT_PROPERTIES;
  SOCIAL_LINK_PROPERTIES = SOCIAL_LINK_PROPERTIES;
}
