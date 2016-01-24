/**
 * Module dependencies
 */

var nodepath = require('path');

// Build logger using best-available information
// when this module is initially required.
var log = require('captains-log')(require('../lib/app/configuration/rc'));


/**
 * Warnings
 */
module.exports = {

  incompatibleLocalChoreo: function (requiredVersion, localVersion) {
    log.warn('Trying to graph app using a local copy of `choreo`');
    log.warn('(located in ' + nodepath.resolve(process.cwd(),
      'node_modules/choreo') + ')');
    log.warn();
    log.warn('But the package.json in the current directory indicates a ' +
      'dependency');
    log.warn('on Choreo `' + requiredVersion +
      '`, and the locally installed ' +
      'Choreo is `' + localVersion + '`!');
    log.warn();
    log.warn('If you run into compatibility issues, try installing ' +
      requiredVersion + ' locally:');
    log.warn('    $ npm install choreo@' + requiredVersion);
    log.warn();
    log.blank();
  },



  // Verbose-only warnings:

  noPackageJSON: function () {
    log.warn('Cannot read package.json in the current directory (' +
      process.cwd() + ')');
    log.warn('Are you sure this is a Choreo app?');
    log.warn();
  },

  notChoreoApp: function () {
    log.warn('The package.json in the current directory does not list ' +
      'Choreo as a dependency...');
    log.warn('Are you sure `' + process.cwd() + '` is a Choreo app?');
    log.warn();
  },

  badLocalDependency: function (pathTo_localChoreo, requiredVersion) {
    log.warn(
      'The local Choreo dependency installed at `' + pathTo.localChoreo +
      '` ' +
      'has a corrupted, missing, or un-parsable package.json file.'
    );
    log.warn('You may consider running:');
    log.warn('rm -rf ' + pathTo_localChoreo + ' && npm install choreo@' +
      app.dependencies.choreo);
    log.warn();
  }
};
