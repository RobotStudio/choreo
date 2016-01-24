var _ = require('lodash');

module.exports = function (choreo) {
  return {

    // Default configuration
    defaults: {
      globals: {
        services: true
      }
    },

    configure: function () {
      choreo.services = {};
    },

    /**
     * Fetch relevant modules, exposing them on `choreo` subglobal if necessary,
     */
    loadModules: function (cb) {
      choreo.log.verbose('Loading app services...');
      choreo.modules.loadServices(function (err, modules) {
        if (err) {
          choreo.log.error('Error occurred loading modules ::');
          choreo.log.error(err);
          return cb(err);
        }

        // Expose modules on `choreo`
        _.merge(choreo.services, modules);

        // Expose globals (if enabled)
        if (choreo.config.globals.services) {
          _.each(choreo.services, function (service, identity) { //TODO: unused variable identity
            var globalName = service.globalId || service.identity;
            global[globalName] = service;
          });
        }

        cb();
      });
    }
  };
};
