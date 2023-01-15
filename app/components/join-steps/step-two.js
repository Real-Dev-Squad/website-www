import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StepTwoComponent extends Component {
  @tracked introduction = '';
  @tracked skills = '';
  @tracked organization = '';
  @tracked funActivities = '';
  @tracked funFacts = '';
}
