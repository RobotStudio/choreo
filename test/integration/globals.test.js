/**
 * Test dependencies
 */
var assert = require('assert');
var httpHelper = require('./helpers/httpHelper.js');
var appHelper = require('./helpers/appHelper');

describe('globals :: ', function () {

  describe('with default settings', function () {

    var choreoprocess;
    var appName = 'testApp';

    before(function (done) {
      this.timeout(15000);
      // Build the app
      appHelper.buildAndGraph(appName, {
        globals: null
      }, function (err, choreo) {

        choreoprocess = choreo;
        return done(err);

      });


    });

    after(function () {

      choreoprocess.kill();
      process.chdir('../');
      appHelper.teardown();
    });

    it('lodash should be globalized', function () {
      assert(_);
      assert.equal(_.name, 'lodash');
    });

    it('async should be globalized', function () {
      assert(async);
    });

    it('choreo should be globalized', function () {
      assert(choreo);
    });

    it('services should be globalized', function () {
      assert(TestService);
    });

    it('models should be globalized', function () {
      assert(User);
    });


  });


});
