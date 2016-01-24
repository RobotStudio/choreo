module.exports = function (choreo) {

  /**
   * List of hooks that required for adminpanel to work
   */
  var requiredHooks = [
    'blueprints',
    'controllers',
    'http',
    'policies',
  ];

  function forbiddenPolicy(req, res, next) {
    return res.forbidden();
  }

  return {

    defaults: {
      __configKey__: {}
    },

    initialize: function (cb) {
      try {
        var eventsToWaitFor = [];
        try {
          /**
           * Check hooks availability
           */
          _.forEach(requiredHooks, function (hook) {
            if (!choreo.hooks[hook]) {
              throw new Error(
                'Cannot use `add-policy` hook without the `' + hook +
                '` hook.');
            }
            //if (hook == 'policies') {
            //    eventsToWaitFor.push('hook:' + hook + ':bound');
            //} else {
            eventsToWaitFor.push('hook:' + hook + ':loaded');
            //}
          });
        } catch (err) {
          if (err) {
            return cb(err);
          }
        }
        if (!choreo.hooks.policies.middleware) {
          choreo.hooks.policies.middleware = {};
        }
        choreo.hooks.policies.middleware.forbidden = forbiddenPolicy;

        cb();
      } catch (err) {
        return cb(err);
      }
    }

  };

};
