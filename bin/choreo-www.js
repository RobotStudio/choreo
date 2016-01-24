#!/usr/bin/env node


/**
 * Module dependencies
 */

var nodepath = require('path');
var _ = require('lodash');
var CaptainsLog = require('captains-log');
var Choreo = require('../lib/app');
var rconf = require('../lib/app/configuration/rc');
var GruntHookDef = require('../lib/hooks/grunt');
var Err = require('../errors');




/**
 * `choreo www`
 *
 * Run the `build` or `buildProd` Grunt task (depending on whether this is the production environment)
 * for the Choreo app in the current working directory.
 *
 * @stability 2
 * @see http://choreojs.org/documentation/reference/command-line-interface/choreo-www
 */

module.exports = function () {
  var log = CaptainsLog(rconf.log);

  // The destination path.
  var wwwPath = nodepath.resolve(process.cwd(), './www');

  // Note that we _load_ but _don't graph_ the app.  That means that the HTTP/Socket.io
  // servers will not actually listen on ports.
  var choreo = Choreo();
  choreo.load(_.merge({}, rconf, {
    // We leave Grunt disabled
    // (since we do all the Grunting ourselves using the raw hook definition below)
    hooks: {
      grunt: false
    }
  }), function whenAppIsLoaded(err) {
    if (err) {
      return Err.fatal.failedToLoadChoreo(err);
    }

    // Determine the appropriate Grunt task to run based on `choreo.config.environment`
    // (which is itself based on NODE_ENV).
    var overrideGruntTask;
    if (choreo.config.environment === 'production') {
      overrideGruntTask = 'buildProd';
    } else {
      overrideGruntTask = 'build';
    }
    log.info(
      'Compiling assets into standalone `www` directory with `grunt ' +
      overrideGruntTask + '`...');

    // Pass in our app (`choreo`) to the hook definition (factory function) in order to get
    // a "hydrated" Grunt hook (a dictionary with methods and other fine goods)
    var hydratedGruntHook = GruntHookDef(choreo);

    // Now use that sopping hook definition to run the appropriate Grunt task.
    // (by the way, `runTask` is technically a private method, and so should not
    //  be relied upon in userland code outside of Choreo core.  Its usage may be
    //  tweaked in a subsequent release.)
    hydratedGruntHook.runTask(overrideGruntTask);

    // Listen for `hook:grunt:error` event from the Grunt hook-- if fired,
    // this means the Grunt child process exited with a non-zero status code.
    // (meaning that someting went awry.)
    choreo.on('hook:grunt:error', function (err) {
      log.error('Error occured running `grunt ' + overrideGruntTask +
        '`');
      log.error(
        'Please resolve any issues and try running `choreo www` again.'
      );
      log.error('Details:');
      log.error(err);
      process.exit(1);
    });

    // Listen for `hook:grunt:done` event from the Grunt hook-- if fired,
    // this means the Grunt child process exited with a zero status code.
    // (meaning that everything worked as expected!)
    choreo.on('hook:grunt:done', function () {
      log.info();
      log.info('Created `www` directory at:');
      log.info(wwwPath);
      process.exit(0);
    });
  });
};
