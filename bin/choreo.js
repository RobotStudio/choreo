#!/usr/bin/env node


/**
 * Module dependencies
 */

var _ = require('lodash');
var program = require('./_commander');
var package = require('../package.json');
var NOOP = function () {};



program
  .version(package.version, '-v, --version');


//
// Normalize version argument, i.e.
//
// $ choreo -v
// $ choreo -V
// $ choreo --version
// $ choreo version
//


// make `-v` option case-insensitive
process.argv = _.map(process.argv, function (arg) {
  return (arg === '-V') ? '-v' : arg;
});


// $ choreo version (--version synonym)
program
  .command('version')
  .description('')
  .action(program.versionInformation);



program
  .option('--silent')
  .option('--verbose')
  .option('--silly')
  .unknownOption = NOOP;
program.usage('[command]');


// $ choreo graph
var cmd;
cmd = program.command('graph');
cmd.option('--prod');
cmd.option('--port [port]');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./choreo-graph'));


// $ choreo new <appname>
cmd = program.command('new [path_to_new_app]');
// cmd.option('--dry');
cmd.option('--viewEngine [viewEngine]');
cmd.option('--template [viewEngine]');
cmd.usage('[path_to_new_app]');
cmd.unknownOption = NOOP;
cmd.action(require('./choreo-new'));


// $ choreo generate <module>
cmd = program.command('generate');
// cmd.option('--dry');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.usage('[something]');
cmd.action(require('./choreo-generate'));

// $ choreo deploy
cmd = program.command('deploy');
// cmd.option('--dry');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.usage('');
cmd.action(require('./choreo-deploy'));


// $ choreo console
cmd = program.command('console');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./choreo-console'));

// some quick aliases (TODO do something more intelligent when we get around to upgrading commander)
cmd = program.command('consle');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./choreo-console'));
cmd = program.command('consloe');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./choreo-console'));
cmd = program.command('c');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./choreo-console'));


// $ choreo www
// Compile `assets` directory into a standalone `www` folder.
cmd = program.command('www');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./choreo-www'));



// $ choreo debug
cmd = program.command('debug');
cmd.unknownOption = NOOP;
cmd.description('');
cmd.action(require('./choreo-debug'));



//
// Normalize help argument, i.e.
//
// $ choreo --help
// $ choreo help
// $ choreo
// $ choreo <unrecognized_cmd>
//


// $ choreo help (--help synonym)
cmd = program.command('help');
cmd.description('');
cmd.action(program.usageMinusWildcard);



// $ choreo <unrecognized_cmd>
// Mask the '*' in `help`.
program
  .command('*')
  .action(program.usageMinusWildcard);



// Don't balk at unknown options
program.unknownOption = NOOP;



// $ choreo
//
program.parse(process.argv);
var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.usageMinusWildcard();
}
