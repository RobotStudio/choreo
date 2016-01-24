/**
 * Module dependencies
 */

var assert = require('assert');

var Choreo = require('root-require')('lib/app');


describe('bootstrap', function () {

  it(
    'should pass the proper untampered-with error from the bootstrap to the callback of choreo.graph()',
    function (done) {

      var ERROR = 'oh no I forgot my keys';
      var bootstrapWasFired;

      Choreo()
        .graph({
          globals: false,
          log: {
            level: 'silent'
          },
          loadHooks: false,
          bootstrap: function (cb) {
            bootstrapWasFired = true;
            cb(ERROR);
          }
        }, function (err) {
          if (!bootstrapWasFired) {
            return done(new Error(
              'Should have called the bootstrap function'));
          }
          if (!err) {
            return done(new Error(
              'Should have passed an error to the callback of choreo.graph()'
            ));
          }

          assert.deepEqual(err, ERROR,
            'Error should be exactly the same as it was when passed from the bootstrap function'
          );
          return done();
        });
    });

  it(
    'if the bootstrap THROWS, Choreo should pass the proper untampered-with error to the callback of choreo.graph()',
    function (done) {

      var ERROR = 'oh no I forgot my keys';

      Choreo()
        .graph({
          globals: false,
          log: {
            level: 'silent'
          },
          loadHooks: false,
          bootstrap: function (cb) {
            bootstrapWasFired = true;
            throw ERROR;
          }
        }, function (err) {
          if (!bootstrapWasFired) {
            return done(new Error(
              'Should have called the bootstrap function'));
          }
          if (!err) {
            return done(new Error(
              'Should have passed an error to the callback of choreo.graph()'
            ));
          }

          assert.deepEqual(err, ERROR,
            'Error should be exactly the same as it was when passed from the bootstrap function'
          );
          return done();
        });
    });


  it(
    'if the bootstrap throws AFTER triggering its callback, Choreo should log an error'
  );

  it('should log an error if the bootstrap\'s callback is called twice');
});
