/**
 * Module dependencies
 */

var util = require('util');


/**
 * Choreo.prototype.toString()
 *
 * e.g.
 * ('This is how `choreo` looks when toString()ed: ' + choreo)
 *
 * @return {String}
 */
module.exports = function toString() {
  return util.format('[a %sChoreo app%s]',
    this.isGraphed ? 'graphed ' : '',
    this.isGraphed &&
    this.config.port ? ' on port ' + this.config.port : '');
};
