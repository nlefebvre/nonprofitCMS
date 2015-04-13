module.exports = function(webServerConfig, webServerCallback) {

  var
    http = require("http"),
    express = require("express"),
    app = express();

  app.use(express.static(webServerConfig.rootFolder));

  http.createServer(app).listen(webServerConfig.port, webServerCallback);
};
