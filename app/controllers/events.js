import Controller from '@ember/controller';
import { EVENTS_PAGE_MAPPING } from '../constants/events-data';

export default class EventsController extends Controller {
  EVENTS_MAPPING = EVENTS_PAGE_MAPPING;
}
