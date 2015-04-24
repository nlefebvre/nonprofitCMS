module.exports = function(config) {

  var
    express = require("express"),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    mongoose = require("mongoose"),
    session = require('express-session'),
    passport = require("passport"),
    Promise = require("bluebird"),
    csrf = require("csrf")(),
    app = express(),
    logger = global.logger;

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
  app.use("/api", bodyParser.urlencoded({ extended: true }));
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
  app.use("/api", require("./routers/users.js")(config, mongoose));
if (false){
    app.use("/api", function(req, res, next) {

        if (!req.user) {
          logger.error("Not a valid user");
          res.status(401).json({
            msg: 'not logged in'
          });
          return;
        }

        if (!csrf.verify(req.session.csrfSecret, req.get("X-CSRF-Token"))){
          logger.log("not a verified user");
          res.status(401).json({
            msg:'not loggged in'
          });
          return;
        }

        csrf.secret().then(function(secret) {
          req.session.csrfSecret = secret;
          res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));
          next();
        })
    });
  }//end if



  // app.use("/api", function(req, res, next) {
  //
	// 	if (!req.user) {
	// 		console.log("not a valid user");
	// 		res.status(401).json({
	// 			msg: 'not logged in'
	// 		});
	// 		return;
	// 	}
  //
	// 	if (!csrf.verify(req.session.csrfSecret, req.get("X-CSRF-Token"))) {
	// 		console.log("not a valid token");
	// 		res.status(401).json({
	// 			msg: 'not logged in'
	// 		});
	// 		return;
	// 	}
  //
	// 	csrf.secret().then(function(secret) {
	// 		req.session.csrfSecret = secret;
	// 		res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));
	// 		next();
	// 	});
  //
  //
	// });
  //


  app.use("/api", require("./routers/content.js")(config, mongoose));
  app.use("/api", require("./routers/donations.js")(config, mongoose));
  app.use("/api", require("./routers/gallery.js")(config, mongoose));

  return app;
};
