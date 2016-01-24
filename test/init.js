// Initialization script that runs once before any tests.
//

// Set the "CHOREO_NEW_LINK" env var so that the "choreo new" generator
// always uses symlinks (rather than doing npm install) regardless of
// which NPM version is installed.
//
// Traditionally, "choreo new" has sped up the process of generating a
// new Choreo app by symlinking required project dependencies from the
// Choreo module's node_modules folder.  However, starting with NPM 3,
// this shortcut will cause subsequent dependencies (installed by the
// end-user) to fail on install, due to the new flattened node_modules
// file structure.
//
// Starting with NPM 3, doing "choreo new" currently causes
// "npm install" to run, in order for the dependencies in the new Choreo
// app to be properly flattened.  However, this takes a long time--too long
// for tests.  Since none of the tests install separate dependencies
// in the fixture app, we can get away with using the old symlink strategy,
// which can be activated with a --link option, or with an environment var.
process.env.CHOREO_NEW_LINK = true;
