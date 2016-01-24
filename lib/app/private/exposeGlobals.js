/**
 * Module dependencies.
 */

var _ = require('lodash');
var async = require('async');


/**
 * exposeGlobals()
 *
 * Expose certain global variables
 * (if config says so)
 *
 * @api private
 */

module.exports = function exposeGlobals() {
  var choreo = this;

  choreo.log.verbose(
    'Exposing global variables... (you can disable this by modifying the properties in `choreo.config.globals`)'
  );

  // Globals explicitly disabled
  if (choreo.config.globals === false) {
    return;
  }

  choreo.config.globals = choreo.config.globals || {};

  // Provide global access (if allowed in config)
  if (choreo.config.globals._ !== false) {
    global['_'] = _;
  }
  if (choreo.config.globals.async !== false) {
    global['async'] = async;
  }
  if (choreo.config.globals.choreo !== false) {
    global['choreo'] = choreo;
  }

  // `services` hook takes care of globalizing services (if enabled)

  // `orm` hook takes care of globalizing models and adapters (if enabled)

};
