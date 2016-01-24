module.exports = function (choreo) {


  /**
   * Module dependencies
   */

  var util = require('choreo-util');



  /**
   * Userconfig
   *
   * Load configuration files.
   */
  return {


    // Default configuration
    defaults: {},


    /**
     * Fetch relevant modules, exposing them on `choreo` subglobal if necessary,
     */
    loadModules: function (cb) {

      choreo.log.verbose('Loading app config...');

      // Grab reference to mapped overrides
      var overrides = util.cloneDeep(choreo.config);


      // If appPath not specified yet, use process.cwd()
      // (the directory where this Choreo process is being initiated from)
      if (!overrides.appPath) {
        choreo.config.appPath = process.cwd();
      }

      // Load config dictionary from app modules
      choreo.modules.loadUserConfig(function loadedAppConfigModules(err,
        userConfig) {
        if (err) return cb(err);

        // Finally, extend user config with overrides
        var config = {};

        config = util.merge(userConfig, overrides);

        // Ensure final configuration object is valid
        // (in case moduleloader fails miserably)
        config = util.isObject(config) ? config : (choreo.config || {});

        // Save final config into choreo.config
        choreo.config = config;

        // Other hooks may use process.env.NODE_ENV to determine the environment,
        // so set that here.  The userconfig hook will set the environment based
        // on the overrides (command line or environment var), local.js key
        // (if available) or else a default of "development"
        process.env.NODE_ENV = choreo.config.environment;

        cb();
      });
    }
  };
};
