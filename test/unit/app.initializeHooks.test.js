/**
 * Module dependencies
 */
var should = require('should');
var assert = require('assert');
var _ = require('lodash');

var constants = require('../fixtures/constants');
var customHooks = require('../fixtures/customHooks');

var $Choreo = require('../helpers/choreo');

var supertest = require('supertest');


// TIP:
//
// To get a hold of the `choreo` instance as a closure variable
// (i.e. if you're tired of using the mocha context):
// var choreo;
// $Choreo.get(function (_choreo) { choreo = _choreo; });


describe('app.initializeHooks()', function () {

  describe('with no hooks', function () {
    var choreo = $Choreo.load.withAllHooksDisabled();
    it('hooks should be exposed on the `choreo` global', function () {
      choreo.hooks.should.be.an.Object;
    });
  });



  describe('with all core hooks and default config', function () {
    var choreo = $Choreo.load();
    it('should expose hooks on the `choreo` global', function () {
      choreo.hooks.should.be.an.Object;
    });
    it('should expose at least the expected core hooks', function () {

      var intersection = _.intersection(_.keys(choreo.hooks), _.keys(
        constants.EXPECTED_DEFAULT_HOOKS));
      assert.deepEqual(intersection, _.keys(constants.EXPECTED_DEFAULT_HOOKS),
        'Missing expected default hooks');
    });
  });



  describe('configured with a custom hook called `noop`', function () {
    var choreo = $Choreo.load({
      hooks: {
        noop: customHooks.NOOP
      }
    });

    it('should expose `noop`', function () {
      choreo.hooks.should.have
        .property('noop');
    });
    it('should also expose the expected core hooks', function () {
      var intersection = _.intersection(Object.keys(choreo.hooks),
        _.keys(constants.EXPECTED_DEFAULT_HOOKS));
      assert.deepEqual(intersection, _.keys(constants.EXPECTED_DEFAULT_HOOKS),
        'Missing expected default hooks');
    });
  });



  describe(
    'configured with a hook (`noop2`), but not its dependency (`noop`)',
    function () {
      var choreo = $Choreo.load.expectFatalError({
        hooks: {

          // This forced failure is only temporary--
          // very hard to test right now as things stand.
          whadga: function (choreo) {
            throw 'temporary forced failure to simulate dependency issue';
          },

          noop2: customHooks.NOOP2
        }
      });
    });



  describe('configured with a hook that always throws', function () {
    var choreo = $Choreo.load.expectFatalError({
      hooks: {
        // This forced failure is only temporary--
        // very hard to test right now as things stand.
        badHook: customHooks.SPOILED_HOOK
      }
    });
  });


  describe('configured with a custom hook with a `defaults` object',
    function () {
      var choreo = $Choreo.load({
        hooks: {
          defaults_obj: customHooks.DEFAULTS_OBJ
        },
        inky: {
          pinky: 'boo'
        }
      });

      it('should add a `foo` key to choreo config', function () {
        assert(choreo.config.foo == 'bar');
      });
      it('should add an `inky.dinky` key to choreo config', function () {
        assert(choreo.config.inky.dinky == 'doo');
      });
      it('should keep the existing `inky.pinky` key to choreo config',
        function () {
          assert(choreo.config.inky.pinky == 'boo');
        });

    });

  describe('configured with a custom hook with a `defaults` function',
    function () {
      var choreo = $Choreo.load({
        hooks: {
          defaults_fn: customHooks.DEFAULTS_FN
        },
        inky: {
          pinky: 'boo'
        }
      });

      it('should add a `foo` key to choreo config', function () {
        assert(choreo.config.foo == 'bar');
      });
      it('should add an `inky.dinky` key to choreo config', function () {
        assert(choreo.config.inky.dinky == 'doo');
      });
      it('should keep the existing `inky.pinky` key to choreo config',
        function () {
          assert(choreo.config.inky.pinky == 'boo');
        });

    });

  describe('configured with a custom hook with a `configure` function',
    function () {
      var choreo = $Choreo.load({
        hooks: {
          config_fn: customHooks.CONFIG_FN
        },
        testConfig: 'oh yeah!'
      });

      it('should add a `hookConfigLikeABoss` key to choreo config',
        function () {
          assert(choreo.config.hookConfigLikeABoss == 'oh yeah!');
        });

    });

  describe('configured with a custom hook with an `initialize` function',
    function () {
      var choreo = $Choreo.load({
        hooks: {
          init_fn: customHooks.INIT_FN
        }
      });

      it('should add a `hookInitLikeABoss` key to choreo config',
        function () {
          assert(choreo.config.hookInitLikeABoss === true);
        });

    });


  describe('configured with a custom hook with a `routes` object',
    function () {
      var choreo = $Choreo.load({
        hooks: {
          routes: customHooks.ROUTES
        },
        routes: {
          "GET /foo": function (req, res, next) {
            choreo.config.foo += "b";
            return next();
          }
        }
      });

      it('should add two `/foo` routes to the choreo config', function () {
        var boundRoutes = choreo.router._privateRouter.routes['get'];
        assert(_.where(boundRoutes, {
            path: "/foo",
            method: "get"
          })
          .length === 3);
      });

      it('should bind the routes in the correct order', function (done) {
        supertest(choreo.router._privateRouter)
          .get('/foo')
          .expect(200, 'abc')
          .end(done);
      });

    });

  describe('configured with a custom hook with advanced routing', function () {
    var choreo = $Choreo.load({
      hooks: {
        advanced_routes: customHooks.ADVANCED_ROUTES
      },
      routes: {
        "GET /foo": function (req, res, next) {
          choreo.config.foo += "c";
          return next();
        }
      }
    });

    it('should add four `/foo` routes to the choreo config', function () {
      var boundRoutes = choreo.router._privateRouter.routes['get'];
      assert(_.where(boundRoutes, {
          path: "/foo",
          method: "get"
        })
        .length === 5);
    });

    it('should bind the routes in the correct order', function (done) {
      supertest(choreo.router._privateRouter)
        .get('/foo')
        .expect(200, 'abcde')
        .end(done);
    });

  });

  // describe('configured with a circular hook dependency', function () {

  // 	// NOTE #1: not currently implemented
  // 	// NOTE #2: not currently possible
  // 	// (should be possible after merging @ragulka's PR)
  // 	// $Choreo.load();

  // 	it('should throw a fatal error');
  // });


});
