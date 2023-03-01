import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class JoinController extends Controller {
  @service router;
  queryParams = ['step'];
  step = 0;
}
