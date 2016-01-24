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
var Choreo = require('../../lib/app');
var async = require('async');

describe('hooks :: ', function () {

  var choreoprocess;

  describe('userconfig hook', function () {
    var appName = 'testApp';

    before(function (done) {
      appHelper.teardown();
      this.timeout(5000);
      async.series([
          function (cb) {
          fs.outputFile(path.resolve(__dirname,
              '../../testApp/config/abc.js'),
            'module.exports = {"foo":"goo"};', cb);
                },
          function (cb) {
          fs.outputFile(path.resolve(__dirname,
              '../../testApp/config/foo/bar.js'),
            'module.exports = {"foo":"bar", "abc":123};', cb
          );
                },
          function (cb) {
          fs.outputFile(path.resolve(__dirname,
              '../../testApp/config/env/development.js'),
            'module.exports = {"cat":"meow"};', cb);
                },
          function (cb) {
          fs.outputFile(path.resolve(__dirname,
            '../../testApp/config/env/development/config.js'
          ), 'module.exports = {"owl":"hoot"};', cb);
                },
          function (cb) {
          fs.outputFile(path.resolve(__dirname,
            '../../testApp/config/env/test-development.js'
          ), 'module.exports = {"duck":"quack"};', cb);
                },
          function (cb) {
          fs.outputFile(path.resolve(__dirname,
            '../../testApp/config/env/test-development/config.js'
          ), 'module.exports = {"dog":"woof"};', cb);
                },
          function (cb) {
          process.chdir('testApp');
          cb();
                }
        ], done);

    });

    after(function () {
      process.chdir('../');
      appHelper.teardown();
    });

    describe("with default options", function () {

      it(
        "should merge config options regardless of file structure",
        function (done) {

          Choreo()
            .load({
              hooks: {
                grunt: false
              }
            }, function (err, choreo) {
              if (err) return callback(err);
              assert.equal(choreo.config.foo, "bar");
              assert.equal(choreo.config.abc, 123);
              assert.equal(typeof (choreo.config.bar),
                "undefined");
              return done();
            });

        });

    });

    describe("with 'dontFlattenConfig' true", function () {

      it("should use filenames in subfolders as keys", function (
        done) {

        Choreo()
          .load({
            hooks: {
              grunt: false
            },
            dontFlattenConfig: true
          }, function (err, choreo) {
            if (err) return callback(err);
            assert.equal(choreo.config.foo, "goo");
            assert.equal(choreo.config.bar.foo, "bar");
            assert.equal(choreo.config.bar.abc, 123);
            assert.equal(typeof (choreo.config.abc),
              "undefined");
            return done();
          });

      });

    });

    describe("in development environment", function () {

      var choreo;
      before(function (done) {

        Choreo()
          .load({
            hooks: {
              grunt: false
            },
            dontFlattenConfig: true
          }, function (err, _choreo) {
            choreo = _choreo;
            return done(err);
          });

      });

      it("should load config from config/env/development.js",
        function () {
          assert.equal(choreo.config.cat, "meow");
        });

      it("should load config from config/env/development/** files",
        function () {
          assert.equal(choreo.config.owl, "hoot");
        });

      it(
        "should not load config from config/env/test-development/** files",
        function () {
          assert(!choreo.config.dog);
        });

      it(
        "should not load config from config/env/test-development.js",
        function () {
          assert(!choreo.config.duck);
        });

    });

    describe("in test-development environment", function () {

      var choreo;
      before(function (done) {

        Choreo()
          .load({
            hooks: {
              grunt: false
            },
            dontFlattenConfig: true,
            environment: 'test-development'
          }, function (err, _choreo) {
            choreo = _choreo;
            return done(err);
          });

      });

      it("should load config from config/env/test-development.js",
        function () {
          assert.equal(choreo.config.duck, "quack");
        });

      it(
        "should load config from config/env/test-development/** files",
        function () {
          assert.equal(choreo.config.dog, "woof");
        });

      it(
        "should not load config from config/env/development/** files",
        function () {
          assert(!choreo.config.owl);
        });

      it("should not load config from config/env/development.js",
        function () {
          assert(!choreo.config.cat);
        });

    });

  });


});
