import Model, { attr, hasMany } from '@ember-data/model';

export default class MembersModel extends Model {
  @hasMany members;
  @attr message;
}
