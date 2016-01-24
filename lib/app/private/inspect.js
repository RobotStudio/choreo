/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');



/**
 * Choreo.prototype.inspect()
 *
 * The string that should be returned when this `Choreo` instance
 * is passed to `util.inspect()` (i.e. when logged w/ `console.log()`)
 *
 * @return {String}
 */

module.exports = function inspect() {
  var choreo = this;

  return util.format('\n' +
      '  |>   %s', this.toString()) + '\n' +
    '\\___/  For help, see: http://links.choreojs.org/docs' +
    '\n\n' +
    'Tip: Use `choreo.config` to access your app\'s runtime configuration.' +
    '\n\n' +
    util.format('%d Models:\n', _(choreo.models)
      .toArray()
      .value()
      .length) +
    _(choreo.models)
    .toArray()
    .filter(function (it) {
      return !it.junctionTable;
    })
    .pluck('globalId')
    .value() + '\n\n' +
    util.format('%d Controllers:\n',
      _(choreo.controllers)
      .toArray()
      .value()
      .length) +
    _(choreo.controllers)
    .toArray()
    .pluck('globalId')
    .map(function (it) {
      return it + 'Controller';
    })
    .value() + '\n\n' +
    // 'Routes:\n'+
    // _(choreo.routes)
    //   .toArray()
    //   .filter(function (it) {return !it.junctionTable;})
    //   .pluck('globalId')
    //   .map(function (it) {return it+'Controller';}).value() + '\n\n' +
    util.format('%d Hooks:\n', _(choreo.hooks)
      .toArray()
      .value()
      .length) +
    _(choreo.hooks)
    .toArray()
    .pluck('identity')
    .value() + '\n' + '';
};
