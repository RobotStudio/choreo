/**
 * Module dependencies
 */
var assert = require('assert'),
  fs = require('fs'),
  wrench = require('wrench'),
  exec = require('child_process')
  .exec,
  _ = require('lodash'),
  appHelper = require('./helpers/appHelper'),
  path = require('path'),
  util = require('util');




/**
 * Module errors
 */

describe('New app generator', function () {
  var choreobin = path.resolve('./bin/choreo.js');
  var appName = 'testApp';
  var defaultTemplateLang = 'ejs';

  this.slow(1000);

  beforeEach(function (done) {
    fs.exists(appName, function (exists) {
      if (exists) {
        wrench.rmdirSyncRecursive(appName);
      }
      done();
    });
  });

  afterEach(function (done) {
    fs.exists(appName, function (exists) {
      if (exists) {
        wrench.rmdirSyncRecursive(appName);
      }
      done();
    });
  });

  describe('choreo new <appname>', function () {

    it('should create new, graphable app in new folder', function (
      done) {
      exec('node ' + choreobin + ' new ' + appName, function (err) {
        if (err) {
          return done(new Error(err));
        }
        appHelper.graph({
          log: {
            level: 'silent'
          }
        }, function (err, choreoprocess) {
          if (err) {
            return done(err);
          }
          choreoprocess.once('hook:http:listening',
            function () {
              choreoprocess.kill(done);
            });
          // choreoprocess.kill(done);
          // setTimeout(done, function(){choreoprocess.kill(done)});
        });
      });
    });

    it('should not overwrite a folder', function (done) {
      fs.mkdir(appName, function (err) {
        if (err) {
          return done(new Error(err));
        }
        fs.writeFile(path.resolve(appName, 'test'), '',
          function (err) {
            if (err) {
              return done(new Error(err));
            }
            exec('node ' + choreobin + ' new ' + appName,
              function (err, dumb, result) {
                assert.notEqual(result.indexOf('error'), -
                  1);
                done();
              });
          });
      });
    });
  });

  describe('choreo generate new <appname>', function () {

    it('should create new app', function (done) {
      exec('node ' + choreobin + ' generate new ' + appName,
        function (err) {
          if (err) {
            return done(new Error(err));
          }
          appHelper.graph({
            log: {
              level: 'silent'
            }
          }, function (err, choreoprocess) {
            if (err) {
              return done(err);
            }
            choreoprocess.once('hook:http:listening',
              function () {
                choreoprocess.kill(done);
              });
          });
        });
    });

    it('should not overwrite a folder', function (done) {
      fs.mkdir(appName, function (err) {
        if (err) {
          return done(new Error(err));
        }
        fs.writeFile(path.resolve(appName, 'test'), '',
          function (err) {
            if (err) {
              return done(new Error(err));
            }
            exec('node ' + choreobin + ' generate new ' +
              appName,
              function (err, dumb, result) {
                assert.notEqual(result.indexOf('error'), -
                  1);
                done();
              });
          });
      });
    });
  });

  describe('choreo new .', function () {

    it('should create new app in existing folder', function (done) {

      // make app folder and move into directory
      fs.mkdirSync(appName);
      process.chdir(appName);

      exec('node ' + path.resolve('..', choreobin) + ' new .',
        function (err) {
          if (err) {
            return done(new Error(err));
          }

          // move from app to its parent directory
          process.chdir('../');

          done();
        });
    });

    it('should not overwrite a folder', function (done) {
      // make app folder and move into directory
      fs.mkdirSync(appName);
      process.chdir(appName);
      fs.mkdirSync('test');
      exec('node ' + path.resolve('..', choreobin) + ' new .',
        function (err, dumb, result) {
          // move from app to its parent directory
          process.chdir('../');
          assert.notEqual(result.indexOf('error'), -1);
          done();
        });
    });
  });

  describe('choreo new with no template option', function () {

    it('should create new app with ejs templates', function (done) {

      exec('node ' + choreobin + ' new ' + appName, function (err) {
        if (err) {
          return done(new Error(err));
        }

        var viewConfig = fs.readFileSync('./' + appName +
          '/config/views.js', 'utf8');
        assert(viewConfig.indexOf('ejs') !== -1,
          'configuration file is incorrect');
        done();
      });
    });
  });

  describe('choreo new <appname> with options --template=ejs', function () {

    it('should create new app with ejs templates', function (done) {

      exec('node ' + choreobin + ' new ' + appName +
        ' --template=ejs',
        function (err) {
          if (err) {
            return done(new Error(err));
          }

          var viewConfig = fs.readFileSync('./' + appName +
            '/config/views.js', 'utf8');
          assert(viewConfig.indexOf('ejs') !== -1,
            'configuration file is incorrect');
          done();
        });
    });
  });

  describe('choreo new <appname> with options --template=jade', function () {

    it('should create new app with jade templates', function (done) {

      exec('node ' + choreobin + ' new ' + appName +
        ' --template=jade',
        function (err) {
          if (err) {
            return done(new Error(err));
          }

          var viewConfig = fs.readFileSync('./' + appName +
            '/config/views.js', 'utf8');
          assert(viewConfig.indexOf('jade') !== -1,
            'configuration file is incorrect');
          done();
        });
    });
  });
});
