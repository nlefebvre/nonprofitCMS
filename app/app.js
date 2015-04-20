module.exports = function(config) {

  var
    http = require("http"),
    express = require("express"),
    app = express();

  app.use(express.static(config.httpServer.rootFolder));

  app.use("/api", bodyParser.json());
  app.use("/api", require("./routers/content.js")(config));
  app.use("/api", require("./routers/donations.js")(config));
  app.use("/api", require("./routers/gallery.js")(config));
  app.use("/api", require("./routers/users.js")(config));

  return app;
};
