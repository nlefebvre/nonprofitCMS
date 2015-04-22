module.exports = function(config) {

  var
    express = require("express"),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    mongoose = require("mongoose"),
    session = require('express-session'),
    passport = require("passport"),
    crypto = require("crypto"),
    app = express(),
    logger = config.logger;

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret : "asecret"
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", bodyParser.json());
  app.use("/api", multer({
  	dest: "./app/uploads",
  	rename: function(fieldName, fileName) {
  		return fileName;
  	}
  }));

  logger.info("Setup root folder:" + config.httpServer.rootFolder);

  app.use(express.static(config.httpServer.rootFolder));

  mongoose.connect("mongodb://" +
    config.mongoServer.host + ":" +
    config.mongoServer.port + "/" +
    config.mongoServer.dbName);

  app.use("/api", bodyParser.json());
  app.use("/api", multer({
    dest: "./app/uploads",
    rename: function(fieldName, fileName){
      return fileName;
    }
  }));
  app.use("/api", require("./routers/content.js")(config, mongoose));
  app.use("/api", require("./routers/donations.js")(config, mongoose));
  app.use("/api", require("./routers/gallery.js")(config, mongoose));
  app.use("/api", require("./routers/users.js")(config, mongoose));


  return app;
};
