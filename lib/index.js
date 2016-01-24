/**
 * Module dependencies
 */

var Choreo = require('./app');



// Instantiate and expose a Choreo singleton
// (maintains legacy support)
module.exports = new Choreo();

// Expose constructor for convenience/tests
module.exports.Choreo = Choreo;


// To access the Choreo app constructor, do:
// var Choreo = require('choreo').constructor;
// or:
// var Choreo = require('choreo').Choreo;
//
// Then:
// var newApp = new Choreo();
