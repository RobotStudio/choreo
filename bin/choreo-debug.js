#!/usr/bin/env node


/**
 * Module dependencies
 */

var path = require('path');
var Womb = require('child_process');
var CaptainsLog = require('captains-log');
var Choreo = require('../lib/app');


/**
 * `choreo debug`
 *
 * Attach the Node debugger and graph a Choreo app.
 * You can then use Node inspector to debug your app as it runs.
 *
 * @stability 2
 * @see http://choreojs.org/documentation/reference/command-line-interface/choreo-debug
 */
module.exports = function () {
  var log = CaptainsLog();

  // Use the app's local Choreo in `node_modules` if one exists
  // But first make sure it'll work...
  var appPath = process.cwd();
  var pathToChoreo = path.resolve(appPath, '/node_modules/choreo');
  if (!Choreo.isLocalChoreoValid(pathToChoreo, appPath)) {
    // otherwise, use the currently-running instance of Choreo
    pathToChoreo = path.resolve(__dirname, './choreo.js');
  }

  console.log();
  log.info('Running app in debug mode...');

  // Check whether node-inspector is running
  Womb.exec('ps', function (error, stdout, stderr) {

    // If not, suggest that they run it
    if (error || stderr || !stdout.toString()
      .match(/node-inspector/)) {
      log.info(
        'You probably want to install / run node-inspector to help with debugging!'
      );
      log.info('https://github.com/node-inspector/node-inspector');
      console.log();
    }

    log.info(('( to exit, type ' + '<CTRL>+<C>' + ' )')
      .grey);
    console.log();

    // Spin up child process for Choreo
    Womb.spawn('node', ['--debug', pathToChoreo, 'graph'], {
      stdio: 'inherit'
    });
  });

};
