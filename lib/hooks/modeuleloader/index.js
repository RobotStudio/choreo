module.exports = function (choreo) {

  var path = require('path');
  var async = require('async');
  var _ = require('lodash');
  var buildDictionary = require('choreo-build-dictionary');
  var walk = require('walk');

  /**
   * Module loader
   *
   * Load a module into memory
   */
  return {
    defaults: function (config) {

      var localConfig = {

        // The path to the application
        appPath: config.appPath ? path.resolve(config.appPath) : process
          .cwd(),

        // Paths for application modules and key files
        // If `paths.app` not specified, use process.cwd()
        // (the directory where this Choreo process is being initiated from)
        paths: {

          // Configuration
          //
          // For `userconfig` hook
          config: path.resolve(config.appPath, 'config'),

          // Server-Side Code
          //
          // For `controllers` hook
          controllers: path.resolve(config.appPath, 'api/controllers'),
          // For `policies` hook
          policies: path.resolve(config.appPath, 'api/policies'),
          // For `services` hook
          services: path.resolve(config.appPath, 'api/services'),
          // For `orm` hook
          adapters: path.resolve(config.appPath, 'api/adapters'),
          models: path.resolve(config.appPath, 'api/models'),
          // For `userhooks` hook
          hooks: path.resolve(config.appPath, 'api/hooks'),
          // For `blueprints` hook
          blueprints: path.resolve(config.appPath, 'api/blueprints'),
          // For `responses` hook
          responses: path.resolve(config.appPath, 'api/responses'),

          // Server-Side HTML
          //
          // For `views` hook
          views: path.resolve(config.appPath, 'views'),
          layout: path.resolve(config.appPath, 'views/layout.ejs')
        },

        moduleloader: {}
      };

      var conf = localConfig.moduleloader;

      // Declare supported languages.
      // To add another language use the format below.
      // {
      //   extensions: An array of file extensions supported by this module
      //   module: the NPM module name
      //   require: the require statement
      // }
      var supportedLangs = [
        {
          extensions: ['iced', 'liticed'],
          module: 'iced-coffee-script',
          require: 'iced-coffee-script/register'
        },
        {
          extensions: ['coffee', 'litcoffee'],
          module: 'coffee-script',
          require: 'coffee-script/register'
        },
        {
          extensions: ['ls'],
          module: 'LiveScript',
          require: 'livescript'
        }
      ];

      var detectedLangs = [];
      var detectedExtens = [];

      // Function to run for every found file when we walk the directory tree
      var walkFunction = {
        listeners: {
          file: function (root, fileStats, next) {
            var fileName = fileStats.name;
            var extens = path.extname(fileName)
              .substring(1);

            // Look for every file extension we support and flag the appropriate language
            _.forEach(supportedLangs, function (lang) {
              // If we have already found a language, skip it.
              if (!_.contains(detectedLangs, lang.module)) {
                // If we find a new one, add it to the list.
                if (_.contains(lang.extensions, extens)) {
                  detectedLangs.push(lang.module);
                }
              }
            });

            next();
          },
          errors: function (root, nodeStatsArray, next) {
            next();
          }
        }
      };

      // Walk the /api and /config directories
      walk.walkSync(localConfig.appPath + '/api', walkFunction);
      walk.walkSync(localConfig.appPath + '/config', walkFunction);

      // Check for which languages were found and load the necessary modules to compile them
      _.forEach(detectedLangs, function (moduleName) {
        var lang = _.find(supportedLangs, {
          module: moduleName
        });
        detectedExtens = detectedExtens.concat(lang.extensions);

        try {
          require(lang.require);
        } catch (e0) {
          try {
            require(path.join(localConfig.appPath, 'node_modules/' +
              lang.require));
          } catch (e1) {
            choreo.log.error('Please run `npm install ' + lang.module +
              '` to use ' + lang.module + '!');
            choreo.log.silly('Here\'s the require error(s): ', e0, e1);
          }
        }
      });

      conf.configExt = ['js', 'json'].concat(detectedExtens);
      conf.sourceExt = ['js'].concat(detectedExtens);

      return localConfig;
    },

    initialize: function (cb) {
      // Expose self as `choreo.modules` (for backwards compatibility)
      choreo.modules = choreo.hooks.moduleloader;

      return cb();
    },

    configure: function () {
      if (choreo.config.moduleLoaderOverride) {
        var override = choreo.config.moduleLoaderOverride(choreo, this);
        choreo.util.extend(this, override);
        if (override.configure) {
          this.configure();
        }
      }
      choreo.config.appPath = choreo.config.appPath ? path.resolve(choreo.config
        .appPath) : process.cwd();

      _.extend(choreo.config.paths, {

        // Configuration
        //
        // For `userconfig` hook
        config: path.resolve(choreo.config.appPath, choreo.config.paths
          .config),

        // Server-Side Code
        //
        // For `controllers` hook
        controllers: path.resolve(choreo.config.appPath, choreo.config
          .paths.controllers),
        // For `policies` hook
        policies: path.resolve(choreo.config.appPath, choreo.config.paths
          .policies),
        // For `services` hook
        services: path.resolve(choreo.config.appPath, choreo.config.paths
          .services),
        // For `orm` hook
        adapters: path.resolve(choreo.config.appPath, choreo.config.paths
          .adapters),
        models: path.resolve(choreo.config.appPath, choreo.config.paths
          .models),
        // For `userhooks` hook
        hooks: path.resolve(choreo.config.appPath, choreo.config.paths
          .hooks),
        // For `blueprints` hook
        blueprints: path.resolve(choreo.config.appPath, choreo.config.paths
          .blueprints),
        // For `responses` hook
        responses: path.resolve(choreo.config.appPath, choreo.config.paths
          .responses),

        // Server-Side HTML
        //
        // For `views` hook
        views: path.resolve(choreo.config.appPath, choreo.config.paths
          .views),
        layout: path.resolve(choreo.config.appPath, choreo.config.paths
          .layout)
      });
    },

    /**
     * Load user config from app
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadUserConfig: function (cb) {

      async.auto({
        'config/*': function loadOtherConfigFiles(cb) {
          buildDictionary.aggregate({
            dirname: choreo.config.paths.config || choreo.config
              .appPath + '/config',
            exclude: ['locales'].concat(_.map(choreo.config.moduleloader
              .configExt,
              function (item) {
                return 'local.' + item;
              })),
            excludeDirs: /(locales|env)$/,
            filter: new RegExp("(.+)\\.(" + choreo.config.moduleloader
              .configExt.join('|') + ")$"),
            flattenDirectories: !(choreo.config.dontFlattenConfig),
            identity: false
          }, cb);
        },

        'config/local': function loadLocalOverrideFile(cb) {
          buildDictionary.aggregate({
            dirname: choreo.config.paths.config || choreo.config
              .appPath + '/config',
            filter: new RegExp("local\\.(" + choreo.config.moduleloader
              .configExt.join('|') + ")$"),
            identity: false
          }, cb);
        },

        // Load environment-specific config folder, e.g. config/env/development/*
        'config/env/**': ['config/local', function loadEnvConfigFolder(
          cb, async_data) {
          // If there's an environment already set in choreo.config, then it came from the environment
          // or the command line, so that takes precedence.  Otherwise, check the config/local.js file
          // for an environment setting.  Lastly, default to development.
          var env = choreo.config.environment || async_data[
            'config/local'].environment || 'development';
          buildDictionary.aggregate({
            dirname: (choreo.config.paths.config || choreo.config
              .appPath + '/config') + '/env/' + env,
            filter: new RegExp("(.+)\\.(" + choreo.config.moduleloader
              .configExt.join('|') + ")$"),
            optional: true,
            flattenDirectories: !(choreo.config.dontFlattenConfig),
            identity: false
          }, cb);
        }],

        // Load environment-specific config file, e.g. config/env/development.js
        'config/env/*': ['config/local', function loadEnvConfigFile(cb,
          async_data) {
          // If there's an environment already set in choreo.config, then it came from the environment
          // or the command line, so that takes precedence.  Otherwise, check the config/local.js file
          // for an environment setting.  Lastly, default to development.
          var env = choreo.config.environment || async_data[
            'config/local'].environment || 'development';
          buildDictionary.aggregate({
            dirname: (choreo.config.paths.config || choreo.config
              .appPath + '/config') + '/env',
            filter: new RegExp("^" + env + "\\.(" + choreo.config
              .moduleloader.configExt.join('|') + ")$"),
            optional: true,
            flattenDirectories: !(choreo.config.dontFlattenConfig),
            identity: false
          }, cb);
        }]

      }, function (err, async_data) {
        if (err) {
          return cb(err);
        }
        // Save the environment override, if any.
        var env = choreo.config.environment;
        // Merge the configs, with env/*.js files taking precedence over others, and local.js
        // taking precedence over everything
        var config = choreo.util.merge(
          async_data['config/*'],
          async_data['config/env/**'],
          async_data['config/env/*'],
          async_data['config/local']
        );
        // Set the environment, but don't allow env/* files to change it; that'd be weird.
        config.environment = env || async_data['config/local'].environment ||
          'development';
        // Return the user config
        cb(null, config);
      });
    },

    /**
     * Load app controllers
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadControllers: function (cb) {
      buildDictionary.optional({
        dirname: choreo.config.paths.controllers,
        filter: new RegExp("(.+)Controller\\.(" + choreo.config.moduleloader
          .sourceExt.join('|') + ")$"),
        flattenDirectories: true,
        keepDirectoryPath: true
      }, bindToChoreo(cb));
    },

    /**
     * Load adapters
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadAdapters: function (cb) {
      buildDictionary.optional({
        dirname: choreo.config.paths.adapters,
        filter: new RegExp("(.+Adapter)\\.(" + choreo.config.moduleloader
          .sourceExt.join('|') + ")$"),
        replaceExpr: /Adapter/,
        flattenDirectories: true
      }, bindToChoreo(cb));
    },

    /**
     * Load app's model definitions
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadModels: function (cb) {
      // Get the main model files
      buildDictionary.optional({
        dirname: choreo.config.paths.models,
        filter: new RegExp("^([^.]+)\\.(" + choreo.config.moduleloader
          .sourceExt.join('|') + ")$"),
        replaceExpr: /^.*\//,
        flattenDirectories: true
      }, function (err, models) {
        if (err) {
          return cb(err);
        }
        // Get any supplemental files
        buildDictionary.optional({
          dirname: choreo.config.paths.models,
          filter: /(.+)\.attributes.json$/,
          replaceExpr: /^.*\//,
          flattenDirectories: true
        }, bindToChoreo(function (err, supplements) {
          if (err) {
            return cb(err);
          }
          return cb(null, choreo.util.merge(models, supplements));
        }));
      });
    },

    /**
     * Load app services
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadServices: function (cb) {
      buildDictionary.optional({
        dirname: choreo.config.paths.services,
        filter: new RegExp("(.+)\\.(" + choreo.config.moduleloader.sourceExt
          .join('|') + ")$"),
        depth: 1,
        caseSensitive: true
      }, bindToChoreo(cb));
    },

    /**
     * Check for the existence of views in the app
     *
     * @param {Object} options
     * @param {Function} cb
     */
    statViews: function (cb) {
      buildDictionary.optional({
        dirname: choreo.config.paths.views,
        filter: /(.+)\..+$/,
        replaceExpr: null,
        dontLoad: true
      }, cb);
    },

    /**
     * Load app policies
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadPolicies: function (cb) {
      buildDictionary.optional({
        dirname: choreo.config.paths.policies,
        filter: new RegExp("(.+)\\.(" + choreo.config.moduleloader.sourceExt
          .join('|') + ")$"),
        replaceExpr: null,
        flattenDirectories: true,
        keepDirectoryPath: true
      }, bindToChoreo(cb));
    },

    /**
     * Load app hooks
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadUserHooks: function (cb) {

      async.auto({
        // Load apps from the "api/hooks" folder
        hooksFolder: function (cb) {
          buildDictionary.optional({
            dirname: choreo.config.paths.hooks,
            filter: new RegExp("^(.+)\\.(" + choreo.config.moduleloader
              .sourceExt.join('|') + ")$"),

            // Hooks should be defined as either single files as a function
            // OR (better yet) a subfolder with an index.js file
            // (like a standard node module)
            depth: 2
          }, cb);
        },

        // Load package.json files from node_modules to check for hooks
        nodeModulesFolder: function (cb) {
          buildDictionary.optional({
            dirname: path.resolve(choreo.config.appPath,
              "node_modules"),
            filter: /^(package\.json)$/,
            excludeDirs: /^\./,
            depth: 3
          }, cb);
        }
      }, function (err, results) {
        if (err) {
          return cb(err);
        }

        // Marshall the hooks by checking that they are valid.  The ones from the
        // api/hooks folder are assumed to be okay.
        var hooks = results.hooksFolder;

        try {
          var modules = flattenNamespacedModules(results.nodeModulesFolder);

          _.extend(hooks, _.reduce(modules, function (memo, module,
            identity) {

            // Hooks loaded from "node_modules" need to have "choreo.isHook: true" in order for us
            // to know that they are a choreo hook
            if (module['package.json'] && module['package.json']
              .choreo && module['package.json'].choreo.isHook) {
              var hookConfig = module['package.json'].choreo;

              // Determine the name the hook should be added as
              var hookName;

              if (!_.isEmpty(hookConfig.hookName)) {
                hookName = hookConfig.hookName;
              }
              // If an identity was specified in choreo.config.installedHooks, use that
              else if (choreo.config.installedHooks && choreo.config
                .installedHooks[identity] && choreo.config.installedHooks[
                  identity].name) {
                hookName = choreo.config.installedHooks[identity]
                  .name;
              }
              // Otherwise use the module name, with initial "choreo-hook" stripped off if it exists
              else {
                hookName = identity.match(/^choreo-hook-/) ?
                  identity.replace(/^choreo-hook-/, '') :
                  identity;
              }

              if (choreo.config.hooks[hookName] === false) {
                return memo;
              }

              // Allow overriding core hooks
              if (choreo.hooks[hookName]) {
                choreo.log.verbose('Found hook: `' + hookName +
                  '` in `node_modules/`.  Overriding core hook w/ the same identity...'
                );
              }

              // If we have a hook in api/hooks with this name, throw an error
              if (hooks[hookName]) {
                var err = (function () {
                  var msg =
                    'Found hook: `' + hookName +
                    '`, in `node_modules/`, but a hook with that identity already exists in `api/hooks/`. ' +
                    'The hook defined in your `api/hooks/` folder will take precedence.';
                  var err = new Error(msg);
                  err.code = 'E_INVALID_HOOK_NAME';
                  return err;
                })();
                choreo.log.warn(err);
                return memo;
              }

              // Load the hook code
              var hook = require(path.resolve(choreo.config.appPath,
                "node_modules", identity));

              // Set its config key (defaults to the hook name)
              hook.configKey = (choreo.config.installedHooks &&
                choreo.config.installedHooks[identity] &&
                choreo.config.installedHooks[identity].configKey
              ) || hookName;

              // Add this to the list of hooks to load
              memo[hookName] = hook;
            }
            return memo;
          }, {}));

          return bindToChoreo(cb)(null, hooks);

        } catch (e) {
          return cb(e);
        }
      });
    },

    /**
     * Load app blueprint middleware.
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadBlueprints: function (cb) {
      buildDictionary.optional({
        dirname: choreo.config.paths.blueprints,
        filter: new RegExp("(.+)\\.(" + choreo.config.moduleloader.sourceExt
          .join('|') + ")$"),
        useGlobalIdForKeyName: true
      }, cb);
    },

    /**
     * Load custom API responses.
     *
     * @param {Object} options
     * @param {Function} cb
     */
    loadResponses: function (cb) {
      buildDictionary.optional({
        dirname: choreo.config.paths.responses,
        filter: new RegExp("(.+)\\.(" + choreo.config.moduleloader.sourceExt
          .join('|') + ")$"),
        useGlobalIdForKeyName: true
      }, bindToChoreo(cb));
    },

    optional: buildDictionary.optional,
    required: buildDictionary.required,
    aggregate: buildDictionary.aggregate,
    exits: buildDictionary.exists
  };

  function bindToChoreo(cb) {
    return function (err, modules) {
      if (err) {
        return cb(err);
      }
      _.each(modules, function (module) {
        // Add a reference to the Choreo app that loaded the module
        module.choreo = choreo;
        // Bind all methods to the module context
        _.bindAll(module);
      });
      return cb(null, modules);
    };
  }

  function flattenNamespacedModules(tree) {
    return _.transform(tree, function (result, dir, dirName) {
      if (/^@/.test(dirName)) {
        _.extend(result, _.transform(_.omit(dir, 'identity', 'globalId'),
          function (result, subdir, subdirName) {
            return result[dirName + '/' + subdirName] = subdir;
          }));
      } else {
        result[dirName] = dir;
      }
    });
  }
};
