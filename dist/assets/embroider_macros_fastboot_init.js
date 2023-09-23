(function () {
  var key = '_embroider_macros_runtime_config';
  if (!window[key]) {
    window[key] = [];
  }
  window[key].push(function (m) {
    m.setGlobalConfig(
      'fastboot',
      Object.assign({}, m.getGlobalConfig().fastboot, { isRunning: true }),
    );
  });
})();
