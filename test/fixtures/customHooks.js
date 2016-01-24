/**
 * Stub custom hooks for use in tests.
 *
 * @type {Object}
 */
module.exports = {

  // Extremely simple hook that doesn't do anything.
  NOOP: function (choreo) {
    return {
      identity: 'noop'
    };
  },

  // Depends on 'noop' hook
  NOOP2: function (choreo) {
    return {
      // TODO: indicate dependency on 'noop' hook
      identity: 'noop2'
    };
  },

  // Deliberately rotten hook- it throws.
  SPOILED_HOOK: function (choreo) {
    throw new Error('smells nasty');
  },

  // Hook to test `defaults` object
  DEFAULTS_OBJ: function (choreo) {
    return {
      identity: 'defaults_obj',
      defaults: {
        foo: 'bar',
        inky: {
          dinky: 'doo',
          pinky: 'dont'
        }
      }
    };
  },

  // Hook to test `defaults` function
  DEFAULTS_FN: function (choreo) {
    return {
      identity: 'defaults_fn',
      defaults: function () {
        return {
          foo: 'bar',
          inky: {
            dinky: 'doo',
            pinky: 'dont'
          }
        };
      }
    };
  },

  // Hook to test `initialize` function
  INIT_FN: function (choreo) {
    return {
      identity: 'init_fn',
      initialize: function (cb) {
        choreo.config.hookInitLikeABoss = true;
        return cb();
      }
    };
  },

  // Hook to test `configure` function
  CONFIG_FN: function (choreo) {
    return {
      identity: 'config_fn',
      configure: function () {
        // Test that loaded config is available by copying a value
        choreo.config.hookConfigLikeABoss = choreo.config.testConfig;
      }
    };
  },

  // Hook to test `routes` function
  ROUTES: function (choreo) {
    return {
      identity: 'routes',
      routes: {
        before: {
          "GET /foo": function (req, res, next) {
            choreo.config.foo = "a";
            next();
          }
        },
        after: {
          "GET /foo": function (req, res, next) {
            choreo.config.foo = choreo.config.foo + "c";
            res.send(choreo.config.foo);
          }
        }
      }
    };
  },

  // Hook to test `routes` function
  ADVANCED_ROUTES: function (choreo) {
    return {
      identity: 'advanced_routes',
      initialize: function (cb) {
        choreo.on('router:before', function () {
          choreo.router.bind('GET /foo', function (req, res, next) {
            choreo.config.foo = choreo.config.foo + "b";
            next();
          });
        });
        choreo.on('router:after', function () {
          choreo.router.bind('GET /foo', function (req, res, next) {
            choreo.config.foo = choreo.config.foo + "e";
            res.send(choreo.config.foo);
          });
        });
        cb();
      },
      routes: {
        before: {
          "GET /foo": function (req, res, next) {
            choreo.config.foo = "a";
            next();
          }
        },
        after: {
          "GET /foo": function (req, res, next) {
            choreo.config.foo = choreo.config.foo + "d";
            next();
          }
        }
      }
    };
  },

};
