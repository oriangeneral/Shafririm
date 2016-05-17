(function(global) {
  var config = /* @echo config.systemjs.configString */;

  if (global.filterSystemConfig) {
    global.filterSystemConfig(config);
  }

  System.config(config);
})(this);
