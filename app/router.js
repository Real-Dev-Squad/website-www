import EmberRouter from '@ember/routing/router';
import config from 'website-www/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('join');
  this.route('live');
  this.route('page-not-found', { path: '/*' });
  this.route('intro');
});
