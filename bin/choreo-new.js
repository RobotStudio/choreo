#!/usr/bin/env node


/**
 * Module dependencies
 */

var nodepath = require('path');
var _ = require('lodash');
var choreogen = require('choreo-generate');
var package = require('../package.json');
var rconf = require('../lib/app/configuration/rc');



/**
 * `choreo new`
 *
 * Generate a new Choreo app.
 *
 * ```
 * # In the current directory:
 * choreo new
 * ```
 *
 * ```
 * # As a new directory or within an existing directory:
 * choreo new foo
 * ```
 *
 * @stability 3
 * @see http://choreojs.org/documentation/reference/command-line-interface/choreo-new
 * ------------------------------------------------------------------------
 * This command builds `scope` for the generator by scooping up any available
 * configuration using `rc` (merging config from env vars, CLI opts, and
 * relevant `.choreorc` files).  Then it runs the `choreo-generate-new`
 * generator (https://github.com/balderdashy/choreo-generate-new).
 */

module.exports = function () {

  // Build initial scope
  var scope = {
    rootPath: process.cwd(),
    modules: {},
    choreoRoot: nodepath.resolve(__dirname, '..'),
    choreoPackageJSON: package,
    viewEngine: rconf.viewEngine
  };

  // Support --template option for backwards-compat.
  if (!scope.viewEngine && rconf.template) {
    scope.viewEngine = rconf.template;
  }

  // Mix-in rconf
  _.merge(scope, rconf.generators);

  // TODO: just do a top-level merge and reference
  // `scope.generators.modules` as needed (simpler)
  _.merge(scope, rconf);


  // Pass the original CLI arguments down to the generator
  // (but first, remove commander's extra argument)
  var cliArguments = Array.prototype.slice.call(arguments);
  cliArguments.pop();
  scope.args = cliArguments;

  scope.generatorType = 'new';

  return choreogen(scope, {
    success: function () {}
  });
};
