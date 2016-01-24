/**
 * Module dependencies
 */

var fs = require('fs');
var CaptainsLog = require('captains-log');
var choreoutil = require('choreo-util');
var semver = require('semver');
var Err = require('../../../errors');



/**
 * Check if the specified installation of Choreo is valid for the
 * specified project.
 *
 * @param choreoPath
 * @param appPath
 */

module.exports = function isLocalChoreoValid(choreoPath, appPath) {

  var choreo = this;

  // Has no package.json file
  if (!fs.existsSync(appPath + '/package.json')) {
    Err.warn.noPackageJSON();
  }

  // Load this app's package.json and dependencies
  var appPackageJSON = choreoutil.getPackageSync(appPath);
  var appDependencies = appPackageJSON.dependencies;


  // Package.json exists, but doesn't list Choreo as a dependency
  if (!(appDependencies && appDependencies.choreo)) {
    Err.warn.notChoreoApp();
    return;
  }

  // Ensure the target Choreo exists
  if (!fs.existsSync(choreoPath)) {
    return false;
  }

  // Read the package.json in the local installation of Choreo
  var choreoPackageJSON = choreoutil.getPackageSync(choreoPath);

  // Local Choreo has a corrupted package.json
  if (!choreoPackageJSON) {
    Err.warn.badLocalDependency(choreoPath, appDependencies.choreo);
    return;
  }


  // Lookup choreo dependency requirement in app's package.json
  var requiredChoreoVersion = appDependencies.choreo;

  //
  // TODO: use npm's built-in version comparator instead of taking care of
  // all these edge cases:
  //

  // If you're using a `git://` choreo dependency, you probably know
  // what you're doing, but we'll let you know just in case.
  var expectsGitVersion = requiredChoreoVersion.match(/^git:\/\/.+/);
  if (expectsGitVersion) {
    var log = choreo.log ? choreo.log : CaptainsLog();

    log.blank();
    log.debug('NOTE:');
    log.debug('This app depends on an unreleased version of Choreo:');
    log.debug(requiredChoreoVersion);
    log.blank();
  }

  // Ignore `latest` and `beta` (kind of like how we handle specified
  // git:// deps)
  var expectsLatest = requiredChoreoVersion === 'latest';
  if (expectsLatest) {
    // ...
  }
  var expectsBeta = requiredChoreoVersion === 'beta';
  if (expectsBeta) {
    // ...
  }

  // Error out if it has the wrong version in its package.json
  if (!expectsLatest && !expectsBeta && !expectsGitVersion) {

    // Use semver for version comparison
    if (!semver.satisfies(choreoPackageJSON.version, requiredChoreoVersion)) {
      Err.warn.incompatibleLocalChoreo(requiredChoreoVersion,
        choreoPackageJSON.version);
    }
  }

  // If we made it this far, the target Choreo installation must be OK
  return true;
};
