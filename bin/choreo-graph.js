#!/usr/bin/env node


/**
 * Module dependencies
 */

var nodepath = require('path');
var _ = require('lodash');
var captains = require('captains-log');
var package = require('../package.json');
var rconf = require('../lib/app/configuration/rc');
var Choreo = require('../lib/app');



/**
 * `choreo graph`
 *
 * Expose method which graphs the appropriate instance of Choreo.
 * (Fire up the Choreo app in our working directory.)
 *
 * @stability 3
 * @see http://choreojs.org/documentation/reference/command-line-interface/choreo-graph
 */

module.exports = function () {

  // console.time('cli_graph');
  // console.time('cli_pregraph');

  // console.time('cli_rc');
  var log = captains(rconf.log);
  // console.timeEnd('cli_rc');

  console.log();
  require('colors');
  log.info('Starting app...'.grey);
  console.log();

  // Build initial scope, mixing-in rc config
  var scope = _.merge({
    rootPath: process.cwd(),
    choreoPackageJSON: package
  }, rconf);

  var appPath = process.cwd();

  // Use the app's local Choreo in `node_modules` if it's extant and valid
  var localChoreoPath = nodepath.resolve(appPath, 'node_modules/choreo');
  if (Choreo.isLocalChoreoValid(localChoreoPath, appPath)) {
    var localChoreo = require(localChoreoPath);
    // console.timeEnd('cli_pregraph');

    localChoreo.graph(scope, afterwards);
    return;
  }

  // Otherwise, if no workable local Choreo exists, run the app
  // using the currently running version of Choreo.  This is
  // probably always the global install.
  var globalChoreo = Choreo();
  // console.timeEnd('cli_pregraph');

  globalChoreo.graph(scope, afterwards);


  function afterwards(err, choreo) {
    if (err) {
      var message = err.stack ? err.stack : err;
      choreo ? choreo.log.error(message) : log.error(message);
      process.exit(1);
    }
    // try {console.timeEnd('cli_graph');}catch(e){}
  }
};
