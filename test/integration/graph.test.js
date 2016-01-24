var assert = require('assert');
var fs = require('fs');
var wrench = require('wrench');
var request = require('request');
var exec = require('child_process')
  .exec;
var spawn = require('child_process')
  .spawn;
var path = require('path');

// Make existsSync not crash on older versions of Node
fs.existsSync = fs.existsSync || require('path')
  .existsSync;

describe('Starting choreo server with graph', function () {
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
      choreoBin = path.resolve('./bin/choreo.js');
    });

    // TODO: make this test more useful
    // it('should throw an error', function(done) {

    // 	choreoServer = spawn(choreoBin, ['graph']);

    // 	choreoServer.stderr.on('data', function(data) {
    // 		var dataString = data + '';
    // 		assert(dataString.indexOf('[err]') !== -1);
    // 		choreoServer.stderr.removeAllListeners('data');
    // 		choreoServer.kill();
    // 		done();
    // 	});
    // });
  });

  describe('in an choreo app directory', function () {

    it('should start server without error', function (done) {

      exec('node ' + choreoBin + ' new ' + appName, function (err) {
        if (err) done(new Error(err));

        // Move into app directory
        process.chdir(appName);
        choreoBin = path.resolve('..', choreoBin);

        choreoServer = spawn('node', [choreoBin, 'graph',
          '--port=1342']);

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

    it(
      'should respond to a request to port 1342 with a 200 status code',
      function (done) {
        process.chdir(appName);
        choreoServer = spawn('node', [choreoBin, 'graph',
          '--port=1342']);
        choreoServer.stdout.on('data', function (data) {
          var dataString = data + '';
          // Server has finished starting up
          if (dataString.match(/Server graphed/)) {
            choreoServer.stdout.removeAllListeners('data');
            setTimeout(function () {
              request('http://localhost:1342/', function (
                err, response) {
                if (err) {
                  choreoServer.kill();
                  done(new Error(err));
                }

                assert(response.statusCode === 200);
                choreoServer.kill();
                process.chdir('../');
                return done();
              });
            }, 1000);
          }
        });
      });
  });


  // These tests have timing issues and should be re-done.
  // ~mike

  // describe('with command line arguments', function() {
  // 	afterEach(function() {
  // 		choreoServer.stderr.removeAllListeners('data');
  // 		choreoServer.kill();
  // 		process.chdir('../');
  // 	});

  // 	it('--prod should change the environment to production', function(done) {

  // 		// Move into app directory
  // 		process.chdir(appName);

  // 		// Overrwrite session config file
  // 		// to set session adapter:null ( to prevent warning message from appearing on command line )
  // 		fs.writeFileSync('config/session.js', 'module.exports.session = { adapter: null }');


  // 		choreoServer = spawn(choreoBin, ['graph', '--prod', '--port=1342']);

  // 		choreoServer.stderr.on('data', function(data) {
  // 			var dataString = data + '';
  // 			if (dataString.indexOf('production') !== -1) {
  // 				return done();
  // 			}
  //        else return done(new Error('Expected log output to contain "production", but it didnt. Instead got: '+dataString));
  // 		});
  // 	});

  // 	it('--dev should change the environment to development', function(done) {

  // 		// Move into app directory
  // 		process.chdir(appName);

  // 		// Change environment to production in config file
  // 		fs.writeFileSync('config/application.js', 'module.exports = ' + JSON.stringify({
  // 			appName: 'Choreo Application',
  // 			port: 1342,
  // 			environment: 'production',
  // 			log: {
  // 				level: 'info'
  // 			}
  // 		}));

  // 		choreoServer = spawn(choreoBin, ['graph', '--dev', '--port=1342']);

  //      choreoServer.stderr.on('data', function(data) { console.log('stdout DEBUG:',data+''); });
  //      choreoServer.stdout.on('data', function(data) { console.log('stderr DEBUG:', data+''); });

  // 		choreoServer.stderr.on('data', function(data) {
  // 			var dataString = data + '';
  // 			if (dataString.indexOf('development') !== -1) {
  // 				return done();
  // 			}
  //        else return done(new Error('Expected log output to have "development" in there, but it didnt. Instead got: '+dataString));
  // 		});
  // 	});
  // });
});
