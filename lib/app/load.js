var async = require('async');
var _ = require('lodash');
var util = require('util');
var __Configuration = require('./configuration');
var __initializeHooks = require('./private/loadHooks');

module.exports = function (choreo) {

  var Configuration = __Configuration(choreo);
  var initializeHooks = __initializeHooks(choreo);

  /**
   * Expose loader start point.
   * (idempotent)
   *
   * @api public
   */
  return function load(configOverride, cb) {

    if (choreo._exiting) {
      return cb(new Error(
        '\n*********\nCannot load or graph an app after ' +
        'it has already been shut down. \nYou can make a ' +
        'new app instance with:\nvar ChoreoApp = ' +
        'require(\'choreo\').Choreo;\nvar choreo = ' +
        'new ChoreoApp();\n\nAnd then you can do:\n' +
        'choreo.load([opts,] cb)\n\n'));
    }

    // configOverride is optional
    if (_.isFunction(configOverride)) {
      cb = configOverride;
      configOverride = {};
    }

    // Ensure override is an object and clone it (or make an empty object if
    // it's not)
    configOverride = configOverride || {};
    choreo.config = _.cloneDeep(configOverride);


    // If host is explicitly specified, set `explicitHost`
    // (otherwise when host is omitted, Express will accept all connections
    // via INADDR_ANY)
    if (configOverride.host) {
      configOverride.explicitHost = configOverride.host;
    }

    // Optionally expose services, models, choreo, _, async, etc. as globals
    // as soon as the user config loads.
    choreo.on('hook:userconfig:loaded', choreo.exposeGlobals);

    async.auto({

      // Apply core defaults and hook-agnostic configuration,
      // esp. overrides including command-line options, environment variables,
      // and options that were passed in programmatically.
      config: [Configuration.load],

      // Load hooks into memory, with their middleware and routes
      hooks: ['config', loadHooks],

      // Populate the "registry"
      // Houses "middleware-esque" functions bound by various hooks and/or
      // Choreo core itself.
      // (i.e. `function (req, res [,next]) {}`)
      //
      // (Basically, that means we grab an exposed `middleware` object,
      // full of functions, from each hook, then make it available as
      // `choreo.middleware.[HOOK_ID]`.)
      //
      // TODO: finish refactoring to change "middleware" nomenclature
      // to avoid confusion with the more specific (and more common)
      // usage of the term.
      registry: ['hooks',
        function populateRegistry(cb) {

          choreo.log.verbose('Instantiating registry...');

          // Iterate through hooks and absorb the middleware therein
          // Save a reference to registry and expose it on
          // the Choreo instance.
          choreo.middleware = choreo.registry =
            // Namespace functions by their source hook's identity
            _.reduce(choreo.hooks, function (registry, hook,
              identity) {
              registry[identity] = hook.middleware;
              return registry;
            }, {});

          choreo.emit('middleware:registered');

          cb();
        }
      ],

      // Load the router and bind routes in `choreo.config.routes`
      router: ['registry', choreo.router.load]

    }, ready__(cb));

    // Makes `app.load()` chainable
    return choreo;
  };

  /**
   * Load hooks in parallel
   * let them work out dependencies themselves,
   * taking advantage of events fired from the choreo object
   *
   * @api private
   */
  function loadHooks(cb) {
    choreo.hooks = {};

    // If config.hooks is disabled, skip hook loading altogether
    if (choreo.config.hooks === false) {
      return cb();
    }

    async.series([

      function (cb) {
        loadHookDefinitions(choreo.hooks, cb);
      },
      function (cb) {
        initializeHooks(choreo.hooks, cb);
      }
    ], function (err) {
      if (err) return cb(err);

      // Inform any listeners that the initial, built-in hooks
      // are finished loading
      choreo.emit('hooks:builtIn:ready');
      choreo.log.verbose('Built-in hooks are ready.');
      return cb();
    });
  }

  /**
   * Load built-in hook definitions from `choreo.config.hooks`
   * and put them back into `hooks` (probably `choreo.hooks`)
   *
   * @api private
   */
  function loadHookDefinitions(hooks, cb) {

    // Mix in user-configured hook definitions
    _.extend(hooks, choreo.config.hooks);

    // Make sure these changes to the hooks object get applied
    // to choreo.config.hooks to keep logic consistent
    // (I think we can get away w/o this, but leaving as a stub)
    // choreo.config.hooks = hooks;

    // If user configured `loadHooks`, only include those.
    if (choreo.config.loadHooks) {
      if (!_.isArray(choreo.config.loadHooks)) {
        return cb('Invalid `loadHooks` config.  ' +
          'Please specify an array of string hook names.\n' +
          'You specified ::' + util.inspect(choreo.config.loadHooks));
      }

      _.each(hooks, function (def, hookName) {
        if (!_.contains(choreo.config.loadHooks, hookName)) {
          hooks[hookName] = false;
        }
      });
      choreo.log.verbose('Deliberate partial load-- will only initialize ' +
        'hooks ::', choreo.config.loadHooks);
    }

    return cb();
  }

  /**
   * Returns function which is fired when Choreo is ready to go
   *
   * @api private
   */
  function ready__(cb) {
    return function (err) {
      if (err) {
        return cb && cb(err);
      }

      choreo.log.verbose('All hooks were loaded successfully.');

      // If userconfig hook is turned off, still load globals.
      if (choreo.config.hooks && choreo.config.hooks.userconfig === false ||
        (choreo.config.loadHooks &&
          choreo.config.loadHooks.indexOf('userconfig') == -1)) {
        choreo.exposeGlobals();
      }

      cb && cb(null, choreo);
    };
  }
};
