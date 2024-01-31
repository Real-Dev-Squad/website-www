import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isoToLocalDate } from '../utils/common-utils';
import { TOAST_OPTIONS } from '../constants/toast-options';

export default class DebugGridsComponent extends Component {
  @service store;
  @service fastboot;
  @service toast;

  @tracked userData;
  @tracked isLoading = true;

  @tracked debugProfileData;
  @tracked debugSocialData;
  @tracked debugUserData;
  @tracked debugUserRolesData;
  @tracked debugFeaturesData;

  DEFAULT_IMAGE = 'assets/images/profile.png';

  constructor() {
    super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.authenticateUserAndFetchdata();
    }
  }

  async authenticateUserAndFetchdata() {
    try {
      const user = await this.store.findRecord('user', 'self');
      this.userData = user;
      this.parseDebugData(this.userData);
    } catch (error) {
      console.log('Failed to authenticate');
    } finally {
      this.isLoading = false;
    }
  }

  parseDebugData(data) {
    this.debugProfileData = {
      fullName: `${data.first_name} ${data.last_name}`,
      imageURL: data.picture.url ?? this.DEFAULT_IMAGE,
    };

    this.debugSocialData = {
      'Twitter Id': data.twitter_id ?? 'N/A',
      'Github Id': data.github_id ?? 'N/A',
      'Linkedin Id': data.linkedin_id ?? 'N/A',
      'Discord Id': data.discord_id ?? 'N/A',
      'Instagram Id': data.instagram_id ?? 'N/A',
    };

    this.debugUserData = {
      Username: data.username ?? 'N/A',
      'Real-Dev-Squad Id': data.id,
      'Incomplete User Details': data.incompleteUserDetails ?? true,
      'Discord Joined At': isoToLocalDate(data.discordJoinedAt) ?? 'N/A',
      'Github Name': data.github_display_name,
      Website: data.website ?? 'N/A',
    };

    this.debugUserRolesData = {
      archived: data.roles.archived ?? true,
      super_user: data.roles.super_user ?? false,
      member: data.roles.member ?? false,
      in_discord: data.roles.in_discord ?? false,
    };

    this.debugFeaturesData = {
      featureFlags: ['dev'],
      isSuperUser: data.roles.super_user ?? false,
    };
  }

  @action setPrivilages() {
    this.toast.success(
      'Your privileges are applied',
      'Success!',
      TOAST_OPTIONS,
    );
  }
}
