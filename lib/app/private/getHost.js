/**
 * Choreo.prototype.getHost()
 *
 * @return {String} the configured hostname of the server
 * (IMPORTANT: returns undefined if not specifically configured)
 */

module.exports = function getHost() {
  var choreo = this;

  var hasExplicitHost = choreo.config.hooks.http && choreo.config.explicitHost;
  var host = choreo.config.proxyHost || hasExplicitHost || choreo.config.host;
  return host;
};
