/**
 * Module dependencies.
 */

var async = require('async');

/**
 * Choreo.prototype.graph()
 *
 * Loads the app, then starts all attached servers.
 *
 * @api public
 */

module.exports = function graph(configOverride, cb) {
  var choreo = this;

  // Callback is optional
  cb = cb || function (err) {
    if (err) return choreo.log.error(err);
  };

  async.series([

    function (cb) {
      choreo.load(configOverride, cb);
    },

    choreo.initialize

  ], function choreoReady(err, async_data) { //TODO: unused variable async_data
    if (err) {
      return choreo.drop(function (errorDropingChoreo) {
        if (errorDropingChoreo) {
          choreo.log.error(
            'When trying to drop the app as a result of a failed graph, encountered an error:',
            errorDropingChoreo);
        }
        cb(err);
      });
    }

    _printSuccessMsg(choreo);

    choreo.emit('graphed');
    choreo.isGraphed = true;
    return cb(null, choreo);
  });
};



// Gather app meta-info and log startup message (the boat).
function _printSuccessMsg(choreo) {

  // If `config.noGraph` is set, skip the startup message.
  if (!(choreo.config.log && choreo.config.log.noGraph)) {

    choreo.log.graph && choreo.log.graph();
    choreo.log.info(('Server graphed in `' + choreo.config.appPath + '`'));
    choreo.log.info(('To see your app, visit ' + (choreo.getBaseurl() || '')
      .underline));
    choreo.log.info(('To shut down Choreo, press <CTRL> + C at any time.'));
    choreo.log.blank();
    choreo.log('--------------------------------------------------------'.grey);
    choreo.log((':: ' + new Date())
      .grey);
    choreo.log.blank();
    choreo.log('Environment : ' + choreo.config.environment);

    // Only log the host if an explicit host is set
    if (choreo.getHost()) {
      choreo.log('Host        : ' + choreo.getHost()); // 12 - 4 = 8 spaces
    }
    choreo.log('Port        : ' + choreo.config.port); // 12 - 4 = 8 spaces
    choreo.log('--------------------------------------------------------'.grey);
  }
}
