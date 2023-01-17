import Component from '@glimmer/component';
import { heardFrom } from '../../constants/social-data';
import { tracked } from '@glimmer/tracking';

export default class StepThreeComponent extends Component {
  @tracked reasonToJoin = '';
  @tracked foundFrom = '';

  heardFrom = heardFrom;
}
