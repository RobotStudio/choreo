var _ = require('lodash');
var portfinder = require('portfinder');
portfinder.basePort = 2001;

var SHOW_VERBOSE_BENCHMARK_REPORT = _.any(process.argv, function (arg) {
  return arg.match(/-v/);
});

describe('benchmarks', function () {

  describe('choreo.load()', function () {
    before(setupBenchmarks);
    after(reportBenchmarks);


    //
    // Instantiate
    //

    benchmark('require("choreo")', function (cb) {
      var Choreo = require('../../lib/app');
      var choreo = new Choreo();
      return cb();
    });


    //
    // Load
    //

    benchmark('choreo.load  [first time, no hooks]', function (cb) {
      var Choreo = require('../../lib/app');
      var choreo = new Choreo();
      choreo.load({
        log: {
          level: 'error'
        },
        globals: false,
        loadHooks: []
      }, cb);
    });

    benchmark('choreo.load  [again, no hooks]', function (cb) {
      this.expected = 25;
      this.comment = 'faster b/c of require cache';

      var Choreo = require('../../lib/app');
      var choreo = new Choreo();
      choreo.load({
        log: {
          level: 'error'
        },
        globals: false,
        loadHooks: []
      }, cb);
    });

    benchmark('choreo.load  [with moduleloader hook]', function (cb) {
      this.expected = 25;
      this.comment = 'faster b/c of require cache';

      var Choreo = require('../../lib/app');
      var choreo = new Choreo();

      choreo.load({
        log: {
          level: 'error'
        },
        globals: false,
        loadHooks: ['moduleloader']
      }, cb);

    });

    benchmark('choreo.load  [all core hooks]', function (cb) {
      this.expected = 3000;

      var Choreo = require('../../lib/app');
      var choreo = new Choreo();
      choreo.load({
        log: {
          level: 'error'
        },
        globals: false
      }, cb);
    });

    benchmark('choreo.load  [again, all core hooks]', function (cb) {
      this.expected = 3000;

      var Choreo = require('../../lib/app');
      var choreo = new Choreo();
      choreo.load({
        log: {
          level: 'error'
        },
        globals: false
      }, cb);
    });


    //
    // Graph
    //

    benchmark('choreo.graph  [w/ a hot require cache]', function (cb) {
      this.expected = 3000;

      var Choreo = require('../../lib/app');
      var choreo = new Choreo();
      portfinder.getPort(function (err, port) {
        if (err) throw err;

        choreo.graph({
          log: {
            level: 'error'
          },
          port: port,
          globals: false
        }, cb);
      });
    });

    benchmark('choreo.graph  [again, w/ a hot require cache]',
      function (cb) {
        this.expected = 3000;

        var Choreo = require('../../lib/app');
        var choreo = new Choreo();
        portfinder.getPort(function (err, port) {
          if (err) throw err;

          choreo.graph({
            log: {
              level: 'error'
            },
            port: port,
            globals: false
          }, cb);
        });
      });

  });


});


/**
 * Run the specified function, capturing time elapsed.
 *
 * @param  {[type]}   description [description]
 * @param  {Function} fn          [description]
 * @return {[type]}               [description]
 */
function benchmark(description, fn) {

  it(description, function (cb) {
    var self = this;

    var t1 = process.hrtime();

    fn.apply(this, [function _callback() {

      var _result = {};

      // If a `comment` or `expected` was provided, harvest it
      _result.expected = self.expected;
      self.expected = null;

      _result.comment = self.comment;
      self.comment = null;

      var diff = process.hrtime(t1);

      _.result.duration = (diff[0] * 1e6) + (diff[1] / 1e3);
      _result.benchmark = description;

      // console.log('finished ',_result);
      self.benchmarks.push(_result);
      cb.apply(Array.prototype.slice.call(arguments));
    }]);
  });
}


/**
 * Use in mocha's `before`
 *
 * @this {Array} benchmarks
 */
function setupBenchmarks() {
  this.benchmarks = [];
}


/**
 * Use in mocha's `after`
 *
 * @this {Array} benchmarks
 */
function reportBenchmarks() {
  var _ = require('lodash');

  require('colors');

  var output = '\n\nBenchmark Report ::\n';
  output += _.reduce(this.benchmarks, function (memo, result) {

    // Convert to ms-
    var ms = (result.duration / 1000.0);

    // round to 0 decimal places
    function _roundDecimalTo(num, numPlaces) {
      return +(Math.round(num + ('e+' + numPlaces)) + ('e-' + numPlaces));
    }
    ms = _roundDecimalTo(ms, 2);


    var expected = result.expected || 1000;

    // threshold: the "failure" threshold
    var threshold = result.expected;

    var color =
      (ms < 1 * expected / 10) ? 'green' :
      (ms < 3 * expected / 10) ? 'green' :
      (ms < 6 * expected / 10) ? 'cyan' :
      (ms < threshold) ? 'yellow' :
      'red';

    ms += 'ms';
    ms = ms[color];

    // Whether to show expected ms
    var showExpected = true; // ms >= threshold;

    return memo + '\n ' +
      (result.benchmark + '') + ' :: '.grey + ms +

      // Expected ms provided, and the test took quite a while
      (result.expected && showExpected ? '\n   (expected ' + expected +
        'ms' +
        (result.comment ? ' --' + result.comment : '') +
        ')' :

        // Comment provided - but no expected ms
        (result.comment ? '\n   (' + result.comment + ')\n' : '')
      )
      .grey;
  }, '');

  // Log output (optional)
  if (SHOW_VERBOSE_BENCHMARK_REPORT) {
    console.log(output);
  }
}
