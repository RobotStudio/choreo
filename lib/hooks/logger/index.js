module.exports = function (choreo) {

  /**
   * Module dependencies.
   */

  var CaptainsLog = require('captains-log'),
    buildGraphFn = require('./graph');



  /**
   * Expose `logger` hook definition
   */

  return {


    defaults: {
      log: {
        level: 'info'

      }
    },


    configure: function () {

    },


    /**
     * Initialize is fired when the hook is loaded,
     * but after waiting for user config.
     */

    initialize: function (cb) {

      // Get basic log functions
      var log = CaptainsLog(choreo.config.log);

      // Mix in log.graph() method
      log.graph = buildGraphFn(
        choreo.version ?
        ('v' + choreo.version) :
        '',
        log.info);

      // Expose log on choreo object
      choreo.log = log;
      cb();
    }
  };
};
