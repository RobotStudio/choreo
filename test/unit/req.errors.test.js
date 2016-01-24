/**
 * Module dependencies
 */

var assert = require('assert');

var $Choreo = require('../helpers/choreo');


describe('request that causes an error', function () {

  var choreo = $Choreo.load({
    globals: false,
    log: {
      level: 'silent'
    },
    loadHooks: [
      'moduleloader',
      'userconfig',
      'responses'
    ]
  });

  it('should return the expected error when something throws', function (
    done) {

    var ERROR = 'oh no I forgot my keys';

    choreo.get('/errors/1', function (req, res) {
      throw ERROR;
    });

    choreo.request('GET /errors/1', {}, function (err) {
      assert.deepEqual(500, err.status);
      assert.deepEqual(ERROR, err.body);
      done();
    });

  });

  it(
    'should call the `res.serverError()` handler when something throws and the "responses" hook is enabled, and the error should emerge, untampered-with',
    function (done) {

      var ERROR = 'oh no I forgot my keys';
      var CHECKPOINT = 'made it';

      choreo.registry.responses.serverError = function (err) {
        assert.deepEqual(ERROR, err);
        this.res.send(500, CHECKPOINT);
      };

      choreo.get('/errors/2', function (req, res) {
        throw ERROR;
      });

      choreo.request('GET /errors/2', {}, function (err) {
        assert.deepEqual(CHECKPOINT, err.body);
        done();
      });

    });

});
