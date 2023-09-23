define('~fastboot/app-factory', [
  'website-www/app',
  'website-www/config/environment',
], function (App, config) {
  App = App['default'];
  config = config['default'];

  return {
    default: function () {
      return App.create(config.APP);
    },
  };
});
