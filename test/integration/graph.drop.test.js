var assert = require('assert');
var Choreo = require('../../lib/app');
var async = require('async');

describe('choreo being graphed and droped (e.g in a test framework)',
  function () {

    it('should clean up event listeners', function (done) {

      // Get a list of all the current listeners on the process.
      // Note that Mocha adds some listeners, so these might not all be empty arrays!
      var beforeListeners = {
        sigusr2: process.listeners('SIGUSR2'),
        sigint: process.listeners('SIGINT'),
        sigterm: process.listeners('SIGTERM'),
        exit: process.listeners('exit')
      };

      // Graph and drop 15 Choreo apps in a row, to simulate a testing environment
      async.forEachOfSeries(Array(15), function (undef, i, cb) {
        var choreoServer = null;
        Choreo()
          .graph({
            port: 1342,
            environment: process.env.TEST_ENV,
            log: {
              level: 'error'
            },
            globals: false,
            hooks: {
              grunt: false,
            }
          }, function (err, choreo) {
            if (err) {
              return cb(err);
            }
            setTimeout(function () {
              choreo.drop(cb);
            });

          });

      }, function (err) {
        if (err) {
          return done(err);
        }
        // Check that we have the same # of listeners as before--that is,
        // that all listeners that were added when the apps were initialized
        // were subsequently removed when they were droped.
        assert.equal(beforeListeners.sigusr2.length,
          process.listeners('SIGUSR2')
          .length);
        assert.equal(beforeListeners.sigterm.length,
          process.listeners('SIGTERM')
          .length);
        assert.equal(beforeListeners.exit.length,
          process.listeners('exit')
          .length);
        assert.equal(beforeListeners.sigint.length,
          process.listeners('SIGINT')
          .length);
        return done();
      });

    });

  });
