/**
 * Module dependencies.
 */

var async = require('async');
var _ = require('lodash');


/**
 * Choreo.prototype.drop()
 *
 * The inverse of `graph()`, this method
 * shuts down all attached servers.
 *
 * It also unbinds listeners and terminates child processes.
 *
 * @api public
 */

module.exports = function drop(cb) {
  var choreo = this;

  choreo.log.verbose('Droping choreo...');
  // Callback is optional
  cb = cb || function (err) {
    if (err) return choreo.log.error(err);
  };

  // Flag `choreo._exiting` as soon as the app has begun to shutdown.
  // This may be used by hooks and other parts of core.
  // (e.g. to stop handling HTTP requests and prevent ugly error msgs)
  choreo._exiting = true;

  var beforeShutdown = (choreo.config && choreo.config.beforeShutdown) ||
    function (cb) {
      return cb();
    };

  // Wait until beforeShutdown logic runs
  beforeShutdown(function (err) {

    // If an error occurred, don't stop-- still try to kill the child processes.
    if (err) {
      choreo.log.error(err);
    }

    // Kill all child processes
    _.each(choreo.childProcesses, function kill(childProcess) {
      choreo.log.verbose('Sent kill signal to child process (' +
        childProcess.pid + ')...');
      try {
        childProcess.kill('SIGINT');
      } catch (e) {
        choreo.log.warn('Error received killing child process: ', e.message);
      }
    });

    // Shut down HTTP server
    // TODO: defer this to the http and sockets hooks-- use choreo.emit('droping')
    // Shut down Socket server
    // wait for all attached servers to stop
    choreo.emit('drop');

    async.series([

      function shutdownSockets(cb) {
        if (!_.isObject(choreo.hooks) || !choreo.hooks.sockets) {
          return cb();
        }

        try {
          choreo.log.verbose('Shutting down socket server...');
          var timeOut = setTimeout(cb, 100);
          choreo.io.server.unref();
          choreo.io.server.close();
          choreo.io.server.on('close', function () {
            choreo.log.verbose(
              'Socket server shut down successfully.');
            clearTimeout(timeOut);
            cb();
          });
        } catch (e) {
          clearTimeout(timeOut);
          cb();
        }
      },

      function shutdownHTTP(cb) {
        if (!_.isObject(choreo.hooks) || !choreo.hooks.http) {
          return cb();
        }

        var timeOut;

        try {
          choreo.log.verbose('Shutting down HTTP server...');

          // Give the server 100ms to close all existing connections
          // and emit the "close" event.  After that, unbind our
          // "close" listener and continue (this prevents the cb
          // from being called twice).
          timeOut = setTimeout(function () {
            choreo.hooks.http.server.removeListener('close',
              onClose);
            return cb();
          }, 100);

          // Allow process to exit once this server is closed
          choreo.hooks.http.server.unref();

          // Stop the server from accepting new connections
          choreo.hooks.http.server.close();

          // Wait for the existing connections to close
          choreo.hooks.http.server.on('close', onClose);

        } catch (e) {
          clearTimeout(timeOut);
          cb();
        }

        function onClose() {
          choreo.log.verbose('HTTP server shut down successfully.');
          clearTimeout(timeOut);
          cb();
        }
      },

      function removeListeners(cb) {
        // Manually remove all event listeners
        _.each(_.keys(choreo._events) || [], function (eventName) {
          choreo.removeAllListeners(eventName);
        });

        var listeners = choreo._processListeners;
        if (listeners) {
          process.removeListener('SIGUSR2', listeners.sigusr2);
          process.removeListener('SIGINT', listeners.sigint);
          process.removeListener('SIGTERM', listeners.sigterm);
          process.removeListener('exit', listeners.exit);
        }
        choreo._processListeners = null;

        // If `choreo.config.process.removeAllListeners` is set, do that.
        if (choreo.config && choreo.config.process && choreo.config.process
          .removeAllListeners) {
          choreo.log.warn(
            "choreo.config.process.removeAllListeners is deprecated; please remove listeners indivually!"
          );
          process.removeAllListeners();
        }

        cb();
      }
    ], cb);

  });

};
