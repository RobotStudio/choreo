/**
 * Test dependencies
 */
var assert = require('assert');
var httpHelper = require('./helpers/httpHelper.js');
var appHelper = require('./helpers/appHelper');
var util = require('util');
var wrench = require('wrench');
var path = require('path');
var fs = require('fs-extra');

describe('hooks :: ', function () {

  var choreoprocess;

  describe('installing a 3rd-party hook', function () {
    var appName = 'testApp';

    before(function () {
      appHelper.teardown();
    });

    describe('into node_modules/choreo-hook-shout', function () {

      before(function (done) {
        this.timeout(5000);
        fs.mkdirs(path.resolve(__dirname, "../..", appName,
          "node_modules"), function (err) {
          if (err) {
            return done(err);
          }
          wrench.copyDirSyncRecursive(path.resolve(
            __dirname,
            'fixtures/hooks/installable/shout'), path.resolve(
            __dirname,
            '../../testApp/node_modules/choreo-hook-shout'
          ));
          process.chdir(path.resolve(__dirname, "../..",
            appName));
          done();
        });
      });

      after(function () {
        process.chdir('../');
        // Sleep for 500ms--otherwise we get timing errors for this test on Windows
        setTimeout(function () {
          appHelper.teardown();
        }, 500);
      });

      describe('with default settings', function () {

        var choreo;

        before(function (done) {
          appHelper.graphQuiet(function (err, _choreo) {
            if (err) {
              return done(err);
            }
            choreo = _choreo;
            return done();
          });
        });

        after(function (done) {
          choreo.drop(done);
        });

        it('should install a hook into `choreo.hooks.shout`',
          function () {

            assert(choreo.hooks.shout);

          });

        it('should use merge the default hook config',
          function () {

            assert(choreo.config.shout.phrase ==
              'make it rain', choreo.config.shout.phrase);

          });

        it(
          'should bind a /shout route that responds with the default phrase',
          function (done) {
            httpHelper.testRoute('GET', "shout", function (
              err, resp, body) {
              assert(body == 'make it rain');
              return done();
            });
          });

      });

      describe('with hook-level config options', function () {

        var choreo;

        before(function (done) {
          appHelper.graphQuiet({
            shout: {
              phrase: "yolo"
            }
          }, function (err, _choreo) {
            if (err) {
              return done(err);
            }
            choreo = _choreo;
            return done();
          });
        });

        after(function (done) {
          choreo.drop(done);
        });

        it(
          'should bind a /shout route that responds with the configured phrase',
          function (done) {
            httpHelper.testRoute('GET', "shout", function (
              err, resp, body) {
              assert(body == 'yolo');
              return done();
            });
          });

      });

      describe('setting the config key to `shoutHook`', function () {

        var choreo;

        before(function (done) {
          appHelper.graphQuiet({
            installedHooks: {
              'choreo-hook-shout': {
                configKey: 'shoutHook'
              }
            },
            shoutHook: {
              phrase: 'holla back!'
            }
          }, function (err, _choreo) {
            if (err) {
              return done(err);
            }
            choreo = _choreo;
            return done();
          });
        });

        after(function (done) {
          choreo.drop(done);
        });


        it(
          'should bind a /shout route that responds with the configured phrase',
          function (done) {
            httpHelper.testRoute('GET', "shout", function (
              err, resp, body) {
              assert(body == 'holla back!');
              return done();
            });
          });

      });

      describe('setting the hook name to `foobar`', function () {

        var choreo;

        before(function (done) {
          appHelper.graphQuiet({
            installedHooks: {
              'choreo-hook-shout': {
                name: 'foobar'
              }
            }
          }, function (err, _choreo) {
            if (err) {
              return done(err);
            }
            choreo = _choreo;
            return done();
          });
        });

        after(function (done) {
          choreo.drop(done);
        });

        it('should install a hook into `choreo.hooks.foobar`',
          function () {

            assert(choreo.hooks.foobar);

          });

        it('should use merge the default hook config',
          function () {

            assert(choreo.config.foobar.phrase ==
              'make it rain', choreo.config.foobar.phrase);

          });

        it(
          'should bind a /shout route that responds with the default phrase',
          function (done) {
            httpHelper.testRoute('GET', "shout", function (
              err, resp, body) {
              assert(body == 'make it rain');
              return done();
            });
          });

      });

      xdescribe(
        'setting the hook name to `views` (an existing hook)',
        function () {

          it('should throw an error', function (done) {
            appHelper.graphQuiet({
              installedHooks: {
                'choreo-hook-shout': {
                  name: 'views'
                }
              }
            }, function (err, _choreo) {
              assert(err && err.code ==
                'E_INVALID_HOOK_NAME');
              done();
            });
          });

        });


    });

    describe('into node_modules/shouty', function () {

      before(function (done) {
        this.timeout(5000);
        fs.mkdirs(path.resolve(__dirname, "../..", appName,
          "node_modules"), function (err) {
          if (err) {
            return done(err);
          }
          wrench.copyDirSyncRecursive(path.resolve(
            __dirname,
            'fixtures/hooks/installable/shout'), path.resolve(
            __dirname,
            '../../testApp/node_modules/shouty'));
          process.chdir(path.resolve(__dirname, "../..",
            appName));
          done();
        });
      });

      after(function () {
        process.chdir('../');
        // Sleep for 500ms--otherwise we get timing errors for this test on Windows
        setTimeout(function () {
          appHelper.teardown();
        });
      });

      describe('with default settings', function () {

        var choreo;

        before(function (done) {
          appHelper.graphQuiet(function (err, _choreo) {
            if (err) {
              return done(err);
            }
            choreo = _choreo;
            return done();
          });
        });

        after(function (done) {
          choreo.drop(done);
        });


        it('should install a hook into `choreo.hooks.shouty`',
          function () {
            assert(choreo.hooks.shouty);

          });

        it('should use merge the default hook config',
          function () {

            assert(choreo.config.shouty.phrase ==
              'make it rain', choreo.config.shouty.phrase);

          });

        it(
          'should bind a /shout route that responds with the default phrase',
          function (done) {
            httpHelper.testRoute('GET', "shout", function (
              err, resp, body) {
              assert(body == 'make it rain');
              return done();
            });
          });

      });

    });

    xdescribe('into node_modules/choreo-hook-views', function () {

      before(function (done) {
        this.timeout(5000);
        fs.mkdirs(path.resolve(__dirname, "../..", appName,
          "node_modules"), function (err) {
          if (err) {
            return done(err);
          }
          wrench.copyDirSyncRecursive(path.resolve(
            __dirname,
            'fixtures/hooks/installable/shout'), path.resolve(
            __dirname,
            '../../testApp/node_modules/choreo-hook-views'
          ));
          process.chdir(path.resolve(__dirname, "../..",
            appName));
          done();
        });
      });

      after(function () {
        process.chdir('../');
        appHelper.teardown();
      });

      it('should throw an error', function (done) {
        appHelper.graphQuiet(function (err, _choreo) {
          assert(err && err.code == 'E_INVALID_HOOK_NAME');
          done();
        });
      });

    });


    xdescribe('into node_modules/views', function () {

      before(function (done) {
        this.timeout(5000);
        fs.mkdirs(path.resolve(__dirname, "../..", appName,
          "node_modules"), function (err) {
          if (err) {
            return done(err);
          }
          wrench.copyDirSyncRecursive(path.resolve(
            __dirname,
            'fixtures/hooks/installable/shout'), path.resolve(
            __dirname,
            '../../testApp/node_modules/views'));
          process.chdir(path.resolve(__dirname, "../..",
            appName));
          done();
        });
      });

      after(function () {
        process.chdir('../');
        appHelper.teardown();
      });

      it('should throw an error', function (done) {
        appHelper.graphQuiet(function (err, _choreo) {
          assert(err && err.code == 'E_INVALID_HOOK_NAME');
          done();
        });
      });

    });

  });

});
