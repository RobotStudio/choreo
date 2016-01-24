/**
 * Module dependencies
 */

var fs = require('fs'),
  path = require('path'),
  choreoutil = require('choreo-util');



/**
 * Check if the specified appPath contains something that looks like a Choreo app.
 *
 * @param {String} appPath
 */

module.exports = function isChoreoAppSync(appPath) {

  // Has no package.json file
  if (!fs.existsSync(path.join(appPath, 'package.json'))) {
    return false;
  }

  // Package.json exists, but doesn't list Choreo as a dependency
  var appPackageJSON = choreoutil.getPackageSync(appPath);
  var appDependencies = appPackageJSON.dependencies;
  if (!(appDependencies && appDependencies.choreo)) {
    return false;
  }

  return true;
};
