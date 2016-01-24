var assert = require('assert');
var httpHelper = require('./helpers/httpHelper.js');
var appHelper = require('./helpers/appHelper');
var path = require('path');
var fs = require('fs');

describe('i18n ::', function () {

  var appName = 'testApp';

  beforeEach(function (done) {
    appHelper.graph({
      verbose: false
    }, function (err, choreo) {
      if (err) {
        throw new Error(err);
      }
      choreoprocess = choreo;
      choreoprocess.once('hook:http:listening', done);
    });
  });

  afterEach(function (done) {
    choreoprocess.kill(done);
  });

  before(function (done) {
    this.timeout(5000);
    appHelper.build(done);
  });

  after(function () {
    process.chdir('../');
    appHelper.teardown();
  });

  describe('with locales generate by choreo-generate-backend', function () {
    it('should say "Welcome" by default', function (done) {
      assert(choreoprocess.__('Welcome') == 'Welcome');
      done();
    });

    it('should say "Welcome" in English', function (done) {
      assert(choreoprocess.__({
        phrase: 'Welcome',
        locale: 'en'
      }) == 'Welcome');
      done();
    });

    it('should say "Bienvenido" in Spanish', function (done) {
      assert(choreoprocess.__({
        phrase: 'Welcome',
        locale: 'es'
      }) == 'Bienvenido');
      done();
    });

    it('should say "Bienvenue" in French', function (done) {
      assert(choreoprocess.__({
        phrase: 'Welcome',
        locale: 'fr'
      }) == 'Bienvenue');
      done();
    });

    it('should say "Willkommen" in German', function (done) {
      //see https://github.com/balderdashy/choreo-generate-backend/pull/10
      assert(choreoprocess.__({
        phrase: 'Welcome',
        locale: 'de'
      }) == 'Willkommen' || choreoprocess.__({
        phrase: 'Welcome',
        locale: 'de'
      }) == 'Wilkommen');
      done();
    });
  });
});
describe('i18n Config ::', function () {

  var appName = 'testApp';

  beforeEach(function (done) {
    appHelper.graph({
      verbose: false
    }, function (err, choreo) {
      if (err) {
        throw new Error(err);
      }
      choreoprocess = choreo;
      choreoprocess.once('hook:http:listening', done);
    });
  });

  afterEach(function (done) {
    choreoprocess.kill(done);
  });

  before(function (done) {
    this.timeout(5000);
    appHelper.build(done);
  });

  after(function () {
    process.chdir('../');
    appHelper.teardown();
  });

  describe('with locales generate by config', function () {

    before(function () {
      var config =
        "module.exports.i18n = { defaultLocale: 'de',updateFiles : true };";
      fs.writeFileSync(path.resolve('../', appName,
        'config/i18n.js'), config);
    });

    it('should say "Willkommen" by defaultLocale', function (done) {
      //see https://github.com/balderdashy/choreo-generate-backend/pull/10
      assert(choreoprocess.__('Welcome') == 'Willkommen' ||
        choreoprocess.__('Welcome') == 'Wilkommen');
      done();
    });

    it('should autoupdate the file', function (done) {
      choreoprocess.__('Login');
      fs.readFile(path.resolve('../', appName,
        'config/locales/de.json'), 'utf8', function read(err,
        data) {
        if (err) {
          throw err;
        } else {
          var de = JSON.parse(data);
          assert(de['Login'] == 'Login');
          done();
        }
      });
    });
  });
});
