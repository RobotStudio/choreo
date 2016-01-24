/**
 * Module dependencies
 */


/**
 * Choreo.prototype.initialize()
 *
 * Start the Choreo server
 * NOTE: choreo.load() should be run first.
 *
 * @api private
 */

module.exports = function initialize(cb) {

  var choreo = this;

  // Callback is optional
  cb = cb || function (err) {
    if (err) choreo.log.error(err);
  };

  // Indicate that server is starting
  choreo.log.verbose('Starting app at ' + choreo.config.appPath + '...');

  var listeners = {
    sigusr2: function () {
      choreo.drop(function () {
        process.kill(process.pid, 'SIGUSR2');
      });
    },
    sigint: function () {
      choreo.drop(process.exit);
    },
    sigterm: function () {
      choreo.drop(process.exit);
    },
    exit: function () {
      if (!choreo._exiting) choreo.drop();
    }
  };

  // Add "beforeShutdown" events
  process.once('SIGUSR2', listeners.sigusr2);

  process.on('SIGINT', listeners.sigint);
  process.on('SIGTERM', listeners.sigterm);
  process.on('exit', listeners.exit);

  choreo._processListeners = listeners;

  // Run the app bootstrap
  choreo.runBootstrap(function afterBootstrap(err) {
    if (err) {
      choreo.log.error('Bootstrap encountered an error: (see below)');
      return cb(err);
    }

    // And fire the `ready` event
    // This is listened to by attached servers, etc.
    choreo.emit('ready');
    cb(null, choreo);
  });
};
