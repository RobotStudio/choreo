var dgram = require('dgram');
var nJwt = require('njwt');
var uuid = require('uuid');


module.exports = function (config) {
  var broadcastAddress = config.network.bcast_addr;
  var key = config.auth.secretKey;
  var claims = config.auth.claims;

  var jwt = nJwt.create(claims, key);

  return function () {
    var client = dgram.createSocket("udp4");
    client.bind();
    message = jwt.compact();

    client.on("listening", function () {
      client.setBroadcast(true);
      client.send(
        message,
        0,
        message.length,
        config.network.bcast_port,
        config.bcast_addr,
        function (err, bytes) {
          client.close();
        });
    });

  };

}
