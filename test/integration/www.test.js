var assert = require('assert');
var fs = require('fs');
var wrench = require('wrench');
var request = require('request');
var exec = require('child_process')
  .exec;
var path = require('path');
var spawn = require('child_process')
  .spawn;

// Make existsSync not crash on older versions of Node
fs.existsSync = fs.existsSync || require('path')
  .existsSync;

describe('Running choreo www', function () {
  var choreoBin = path.resolve('./bin/choreo.js');
  var appName = 'testApp';
  var choreoServer;

  before(function () {
    if (fs.existsSync(appName)) {
      wrench.rmdirSyncRecursive(appName);
    }
  });

  after(function () {
    if (fs.existsSync(appName)) {
      wrench.rmdirSyncRecursive(appName);
    }
  });

  describe('in an empty directory', function () {

    before(function () {
      // Make empty folder and move into it
      fs.mkdirSync('empty');
      process.chdir('empty');
      choreoBin = path.resolve('..', choreoBin);
    });

    after(function () {
      // Delete empty folder and move out of it
      process.chdir('../');
      fs.rmdirSync('empty');
      choreoBin = path.resolve(choreoBin);
    });

  });

  describe('in a choreo app directory', function () {

    it('should start server without error', function (done) {

      exec('node ' + choreoBin + ' new ' + appName, function (err) {
        if (err) done(new Error(err));
        // Move into app directory
        process.chdir(appName);
        choreoBin = path.resolve('..', choreoBin);

        choreoServer = spawn('node', [choreoBin, 'www']);

        choreoServer.stderr.on('data', function (data) {
          return done(data);
        });

        choreoServer.stdout.on('data', function (data) {
          var dataString = data + '';
          assert(dataString.indexOf('error') === -1);
          choreoServer.stdout.removeAllListeners('data');
          choreoServer.kill();
          // Move out of app directory
          process.chdir('../');
          done();
        });
      });
    });

  });

  describe('with command line arguments', function () {
    afterEach(function () {
      choreoServer.stderr.removeAllListeners('data');
      choreoServer.kill();
      process.chdir('../');
    });

    it('--dev should execute grunt build', function (done) {

      // Move into app directory
      process.chdir(appName);

      // Change environment to production in config file
      fs.writeFileSync('config/application.js',
        'module.exports = ' + JSON.stringify({
          appName: 'Choreo Application',
          port: 1342,
          environment: 'production',
          log: {
            level: 'info'
          }
        }));

      choreoServer = spawn('node', [choreoBin, 'www', '--dev']);

      choreoServer.stdout.on('data', function (data) {
        var dataString = data + '';
        if (dataString.indexOf("`grunt build`") !== -1) {

          done();
        }
      });
    });

    it('--prod should execute grunt buildProd', function (done) {

      // Move into app directory
      process.chdir(appName);

      // Overrwrite session config file
      // to set session adapter:null ( to prevent warning message from appearing on command line )
      fs.writeFileSync('config/session.js',
        'module.exports.session = { adapter: null }');

      choreoServer = spawn('node', [choreoBin, 'www', '--prod']);

      choreoServer.stdout.on('data', function (data) {
        var dataString = data + '';
        if (dataString.indexOf("`grunt buildProd`") !== -1) {

          done();
        }
      });
    });

  });
});
