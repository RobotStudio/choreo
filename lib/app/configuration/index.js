/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var DEFAULT_HOOKS = require('./default-hooks');

module.exports = function (choreo) {

  /**
   * Expose new instance of `Configuration`
   */

  return new Configuration();


  function Configuration() {


    /**
     * Choreo default configuration
     *
     * @api private
     */
    this.defaults = function defaultConfig(appPath) {

        var defaultEnv;
        // If we're not loading the userconfig hook, which normally takes care
        // of ensuring that we have an environment, then make sure we set one here.
        if (_.isObject(choreo.config.hooks) &&
          choreo.config.hooks.userconfig === false ||
          (_.isArray(choreo.config.loadHooks) &&
            choreo.config.loadHooks.indexOf('userconfig') == -1)
        ) {
          defaultEnv = choreo.config.environment || "development";
        }

        // If `appPath` not specified, unfortunately, this is a fatal error,
        // since reasonable defaults cannot be assumed
        if (!appPath) {
          throw new Error('No `appPath` specified!');
        }

        // Set up config defaults
        return {

          environment: defaultEnv,

          // Note: to avoid confusion re: timing, `hooks` configuration
          // may eventually be removed from `choreo.config` in favor of
          // something more flexible / obvious, e.g. the `app` object
          // itself (i.e. because you can't configure hooks in `userconfig`--
          // only in `overrides`).

          // Core (default) hooks
          hooks: _.reduce(DEFAULT_HOOKS,
            function (memo, hookBundled, hookIdentity) {

              // if `true`, then the core hook is bundled in the `lib/hooks/`
              // directory as `lib/hooks/HOOK_IDENTITY`.
              if (hookBundled === true) {
                memo[hookIdentity] = require('../../hooks/' + hookIdentity);
              }
              // if it's a string, then the core hook is an NPM dependency of
              // choreo, so require it (which grabs it from `node_modules/`)
              else if (_.isString(hookBundled)) {
                var hook;
                try {
                  hook = require(hookBundled);
                } catch (e) {
                  throw new Error('Choreo internal error: Could not ' +
                    'require(\'' + hookBundled + '\')');
                }
                memo[hookIdentity] = hook;
              }
              // otherwise freak out
              else {
                throw new Error('Choreo internal error: "' +
                  hookIdentity + '", a core hook, is invalid!');
              }
              return memo;
            }, {}) || {},

          // Save appPath in implicit defaults
          // appPath is passed from above in case `choreo graph` was used
          // This is the directory where this Choreo process is being
          // initiated from.  (  usually this means `process.cwd()`  )
          appPath: appPath,

          // Built-in path defaults
          paths: {
            tmp: path.resolve(appPath, '.tmp')
          },

          // Start off `routes` and `middleware` as empty objects
          routes: {},
          middleware: {}

        };
      },



      /**
       * Load the configuration modules
       *
       * @api private
       */

      this.load = require('./load')(choreo);



    // Bind the context of all instance methods
    _.bindAll(this);

  }

};
