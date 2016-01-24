//
//
// TODO
// =================
// Merge with appHelper.js!
//
//



var fs = require('fs-extra');
var wrench = require('wrench');
var _ = require('lodash');
var exec = require('child_process')
  .exec;
var path = require('path');
var choreoBin = path.resolve('./bin/choreo.js');
var spawn = require('child_process')
  .spawn;
var Choreo = require('../../../lib/app');
var io = require('./choreo.io.js')(require('socket.io-client'));
io.choreo.environment = "production";
io.choreo.autoConnect = false;

// Make existsSync not crash on older versions of Node
fs.existsSync = fs.existsSync || path.existsSync;


// var _ioClient = require('./choreo.io')(require('socket.io-client'));



/**
 * Uses the Choreo binary to create a namespaced test app
 * If no appName is given use 'testApp'
 *
 * It copies all the files in the fixtures folder into their
 * respective place in the test app so you don't need to worry
 * about setting up the fixtures.
 */

module.exports.build = function ( /* [appName], done */ ) {
  var args = Array.prototype.slice.call(arguments),
    done = args.pop(),
    appName = 'testApp';

  // Allow App Name to be optional
  if (args.length > 0) appName = args[0];

  // Cleanup old test fixtures
  if (fs.existsSync(appName)) {
    wrench.rmdirSyncRecursive(path.resolve('./', appName));
  }

  fs.mkdirSync(path.resolve('./', appName));

  process.chdir(appName);

  exec('node ' + choreoBin + ' new', function (err) {
    if (err) return done(err);
    var fixtures = wrench.readdirSyncRecursive(
      '../test/integration/fixtures/sampleapp');
    if (fixtures.length < 1) return done();

    // If fixtures copy them to the test app
    fixtures.forEach(function (file) {
      var filePath = path.resolve(
        '../test/integration/fixtures/sampleapp', file);

      // Check if file is a directory
      var stat = fs.statSync(filePath);

      // Ignore directories
      if (stat.isDirectory()) return;

      // Copy File to Test App
      var data = fs.readFileSync(filePath);

      // Create file and any missing parent directories in its path
      fs.createFileSync(path.resolve(file), data);
      fs.writeFileSync(path.resolve(file), data);
    });

    // process.chdir(appName);
    return done();
  });
};

/**
 * Remove a Test App
 */

module.exports.teardown = function (appName) {
  appName = appName ? appName : 'testApp';
  var dir = path.resolve('./', appName);
  if (fs.existsSync(dir)) {
    wrench.rmdirSyncRecursive(dir);
  }
};

module.exports.graphQuiet = function (options, callback) {

  if (typeof options == 'function') {
    callback = options;
    options = null;
  }

  options = options || {};
  _.defaults(options, {
    log: {
      level: 'silent'
    }
  });

  return module.exports.graph(options, callback);

};

module.exports.graph = function (options, callback) {

  delete process.env.NODE_ENV;

  if (typeof options == 'function') {
    callback = options;
    options = null;
  }

  options = options || {};
  _.defaults(options, {
    port: 1342,
    environment: process.env.TEST_ENV
  });

  Choreo()
    .graph(options, function (err, choreo) {
      if (err) return callback(err);
      choreo.kill = choreo.drop;
      return callback(null, choreo);
    });

};

module.exports.buildAndGraph = function (appName, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = null;
  }
  module.exports.build(appName, function () {
    module.exports.graph(options, callback);
  });
};

module.exports.graphWithTwoSockets = function (options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = null;
  }
  module.exports.graph(options, function (err, choreo) {
    if (err) {
      return callback(err);
    }

    var socket1 = io.choreo.connect('http://localhost:1342', {
      multiplex: false,
    });
    socket1.on('connect', function () {
      var socket2 = io.choreo.connect('http://localhost:1342', {
        multiplex: false,
      });
      socket2.on('connect', function () {
        return callback(null, choreo, socket1, socket2);
      });
    });
  });
};

module.exports.buildAndGraphWithTwoSockets = function (appName, options,
  callback) {
  if (typeof options == 'function') {
    callback = options;
    options = null;
  }
  module.exports.build(appName, function () {
    module.exports.graphWithTwoSockets(options, callback);
  });
};
