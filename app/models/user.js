import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr first_name;
  @attr last_name;
  @attr username;
  @attr('string', { defaultValue: 'onboarding' }) status;
  @attr roles;
  @attr yoe;
  @attr picture;
  @attr company;
  @attr incompleteUserDetails;
  @attr github_display_name;
  @attr github_id;
  @attr instagram_id;
  @attr linkedin_id;
  @attr twitter_id;
  @attr discordId;
  @attr discordJoinedAt;
  @attr profileURL;
  @attr profileStatus;
  @attr website;
}
