module.exports = function (choreo) {

  var phrase;
  return {

    defaults: {
      __configKey__: {
        phrase: "make it rain"
      }
    },

    initialize: function (cb) {
      phrase = choreo.config[this.configKey].phrase;
      cb();
    },

    routes: {
      before: {
        "GET /shout": function (req, res, next) {
          res.send(phrase);
        }
      }
    }

  };

};
