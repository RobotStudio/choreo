/**
 * Module dependencies.
 */

// try {console.time('require_core');}catch(e){}
var Choreo = require('./Choreo');
var _ = require('lodash');


/**
 * Expose `Choreo` factory
 */

module.exports = ChoreoFactory;

function ChoreoFactory() {
  return new Choreo();
}


// Backwards compatibility for Choreo singleton usage:
var singleton = ChoreoFactory();
ChoreoFactory.isLocalChoreoValid =
  _.bind(singleton.isLocalChoreoValid, singleton);
ChoreoFactory.isChoreoAppSync = _.bind(singleton.isChoreoAppSync, singleton);
