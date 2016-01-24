/**
 * Module dependencies
 */
var $Choreo = require('root-require')('test/helpers/choreo');
var $Router = require('root-require')('test/helpers/router');



describe('choreo.router.unbind', function () {

  var choreo = $Choreo.load.withAllHooksDisabled();


  $Router.unbind('get /foo')
    .shouldDelete({
      path: '/foo',
      method: 'get'
    });



  $Router.unbind('post /bar_baz_beezzz')
    .shouldDelete({
      path: '/bar_baz_beezzz',
      method: 'post'
    });



  $Router.unbind('patch /user')
    .shouldDelete({
      path: '/user',
      method: 'patch'
    });

});
