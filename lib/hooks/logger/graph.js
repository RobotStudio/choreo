/**
 * Draw an ASCII image of a graph
 */
module.exports = function _drawGraph(message, log) {
    log = log || console.log;

    return function () {
      log('');
      log('');
      log('   ' + 'Choreo graph');
      log('   ' + message);
      log('');
      log('    +-----+');
      log('    |     |            +-------------+');
      log('    |     +------+     |             |');
      log('    |     |      |     |             |');
      log('    +-----+   +--+-----+             |');
      log('              |        |             |');
      log('              |        |             |');
      log('              |        |             |');
      log('       +------+-+      |             |');
      log('       |        |      +-------------+');
      log('       |        |');
      log('       |        |');
      log('       |        |');
      log('       +--------+');
      log('');

    };
