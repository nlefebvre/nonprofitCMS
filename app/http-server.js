module.exports = function(config, logger) {

  var
    http = require("http");

  config.httpServer.callback =
    config.httpServer.callback.bind(config.httpServer);

   config.webSockets(http.createServer(config.app), logger)
     .listen(config.httpServer.port, config.httpServer.callback);
  //http.createServer(config.app).listen(config.httpServer.port, config.httpServer.callback);
};
