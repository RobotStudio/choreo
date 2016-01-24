/**
 * Module dependencies
 */

var rc = require('rc');


/**
 * Locate and load a .choreorc file if one exists.
 *
 * NOTE: this occurs almost immediately when choreo is required,
 * and since `rc` is synchronous, the examination of env variables,
 * cmdline opts, and .choreorc files is immediate, and happens only once.
 *
 * @type {Object}
 */
module.exports = rc('choreo');
