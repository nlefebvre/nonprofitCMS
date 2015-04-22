module.exports = function(webServer, logger) {
  "use strict";

  var
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: webServer });

  wss.on("connection", function(ws) {

    logger.info("web sockets open");

    ws.on("error", function(data) {
      logger.error("web sockets error");
    });

    ws.on("close", function(data) {
      logger.info("web sockets closed");
    });

    ws.on("message", function(msg) {
      var data = JSON.parse(msg);
      if(data.messageType === "error") {
        logger.error(data.message)
      }
      //logger.info("message received: " + data.source);
      ws.send(JSON.stringify({
        status: "OK"
      }));

    });
  });

  return webServer;

};
