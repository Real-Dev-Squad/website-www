import Model, { attr } from '@ember-data/model';

export default class LogModel extends Model {
  @attr logs;
}
