import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isoToLocalDate } from '../utils/common-utils';

export default class DebugGridsComponent extends Component {
  @service store;
  @service fastboot;
  @service login;

  DEFAULT_IMAGE = 'assets/images/profile.png';

  @tracked debugProfileData = {
    fullName: `${this.login.userData.first_name} ${this.login.userData.last_name}`,
    imageURL: this.login.userData.picture?.url ?? this.DEFAULT_IMAGE,
  };

  @tracked debugSocialData = {
    'Twitter Id': this.login.userData.twitter_id ?? 'N/A',
    'Github Id': this.login.userData.github_id ?? 'N/A',
    'Linkedin Id': this.login.userData.linkedin_id ?? 'N/A',
    'Discord Id': this.login.userData.discord_id ?? 'N/A',
    'Instagram Id': this.login.userData.instagram_id ?? 'N/A',
  };

  @tracked debugUserData = {
    Username: this.login.userData.username ?? 'N/A',
    'Real-Dev-Squad Id': this.login.userData.id,
    'Incomplete User Details':
      this.login.userData.incompleteUserDetails ?? true,
    'Discord Joined At':
      isoToLocalDate(this.login.userData.discordJoinedAt) ?? 'N/A',
    'Github Name': this.login.userData.github_display_name,
    Website: this.login.userData.website ?? 'N/A',
  };

  @tracked debugUserRolesData = {
    archived: this.login.userData.roles?.archived ?? true,
    super_user: this.login.userData.roles?.super_user ?? false,
    member: this.login.userData.roles?.member ?? false,
    in_discord: this.login.userData.roles?.in_discord ?? false,
  };

  @tracked debugFeaturesData = {
    featureFlags: ['dev'],
    isSuperUser: this.login.userData.roles?.super_user ?? false,
  };
}
