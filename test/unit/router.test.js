/**
 * Module dependencies
 */
var should = require('should');

var $Choreo = require('../helpers/choreo');


describe('`choreo.router`', function () {

  var choreo = $Choreo.load.withAllHooksDisabled();



  it('should be exposed on the `choreo` global', function () {
    choreo
      .router
      ._privateRouter
      .routes
      .should.be.ok;
  });
});
