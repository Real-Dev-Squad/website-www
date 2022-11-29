import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string', { defaultValue: 'User' }) first_name;
  @attr last_name;
  @attr username;
  @attr('string', { defaultValue: 'active' }) status;
  @attr roles;
  @attr yoe;
  @attr('json', { defaultValue: 'dummyProfilePicture.png' }) picture;
  @attr company;
  @attr incompleteUserDetails;
  @attr github_display_name;
  @attr github_id;
  @attr instragram_id;
  @attr linkedin_id;
  @attr twitter_id;
  @attr profileURL;
  @attr profileStatus;
}
