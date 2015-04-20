module.exports = function(webServer) {
  "use strict";

  var
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: webServer });

  wss.on("connection", function(ws) {

    console.log("web sockets open");

    ws.on("error", function(data) {
      console.log("web sockets error");
    });

    ws.on("close", function(data) {
      console.log("web sockets closed");
    });

    ws.on("message", function(msg) {
      var data = JSON.parse(msg);
      console.log("message received: " + data.source);

      ws.send(JSON.stringify({
        source: "echo: " + data.source
      }));

    });
  });

  return webServer;

};
