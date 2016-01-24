var assert = require('assert');
var fs = require('fs');
var request = require('request');
var appHelper = require('./helpers/appHelper');
var path = require('path');

describe('Starting HTTPS choreo server with graph', function () {

  var appName = 'testApp';

  before(function (done) {
    this.timeout(5000);
    appHelper.build(done);
  });

  after(function () {
    process.chdir('../');
    appHelper.teardown();
  });


  describe('using choreo.config.ssl.key and choreo.config.ssl.cert',
    function () {

      var choreoServer;

      before(function () {
        var opts = {
          ssl: {
            key: require('fs')
              .readFileSync(require('path')
                .resolve(__dirname, 'cert', 'choreotest-key.pem'))
              .toString(),
            cert: require('fs')
              .readFileSync(require('path')
                .resolve(__dirname, 'cert', 'choreotest-cert.pem')
              )
              .toString()
          }
        };
        fs.writeFileSync(path.resolve('../', appName,
          'config/ssl.js'), "module.exports = " + JSON.stringify(
          opts) + ";");
      });

      after(function (done) {
        if (choreoServer) {
          return choreoServer.drop(done);
        }
        return done();
      });

      it('should start server without error', function (done) {
        appHelper.graph(function (err, _choreoServer) {
          assert(!err);
          choreoServer = _choreoServer;
          return done();
        });

      });

      it(
        'should respond to a request to port 1342 with a 200 status code',
        function (done) {
          if (!choreoServer) {
            return done('Bailing due to previous test failure!');
          }

          request.get({
            url: 'https://localhost:1342/',
            ca: require('fs')
              .readFileSync(require('path')
                .resolve(__dirname, 'cert', 'choreotest-cert.pem')
              ),
          }, function (err, response) {
            assert(!err);
            assert.equal(response.statusCode, 200);
            return done();
          });

        });
    });

  describe(
    'using choreo.config.ssl = true and choreo.config.http.serverOptions',
    function () {

      var choreoServer;

      before(function () {
        var opts = {
          ssl: true,
          http: {
            serverOptions: {
              key: require('fs')
                .readFileSync(require('path')
                  .resolve(__dirname, 'cert', 'choreotest-key.pem')
                )
                .toString(),
              cert: require('fs')
                .readFileSync(require('path')
                  .resolve(__dirname, 'cert',
                    'choreotest-cert.pem'))
                .toString()
            }
          }
        };
        fs.writeFileSync(path.resolve('../', appName,
          'config/ssl.js'), "module.exports = " + JSON.stringify(
          opts) + ";");
      });

      after(function (done) {
        if (choreoServer) {
          return choreoServer.drop(done);
        }
        return done();
      });

      it('should start server without error', function (done) {
        appHelper.graph(function (err, _choreoServer) {
          assert(!err);
          choreoServer = _choreoServer;
          return done();
        });

      });

      it(
        'should respond to a request to port 1342 with a 200 status code',
        function (done) {
          if (!choreoServer) {
            return done('Bailing due to previous test failure!');
          }

          request.get({
            url: 'https://localhost:1342/',
            ca: require('fs')
              .readFileSync(require('path')
                .resolve(__dirname, 'cert', 'choreotest-cert.pem')
              ),
          }, function (err, response) {
            assert(!err);
            assert.equal(response.statusCode, 200);
            return done();
          });

        });
    });
});
