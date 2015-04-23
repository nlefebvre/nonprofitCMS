module.exports = function(config, mongoose) {

  var
    express = require("express"),
    passport = require("passport"),
    crypto = require("crypto"),
    Promise = require("bluebird"),
    csrf = require("csrf")(),
    accountRouter = express.Router(),
    logger = global.logger;


  // passport.serializeUser(function(user, done) {
  //     done(null, user);
  // });
  //
  // passport.deserializeUser(function(user, done) {
  //   done(null, user);
  // });
  //
  // app.use(session({
  //   resave: false,
  //   saveUninitialized: false,
  //   secret : "asecret"
  // }));
  //
  // app.use(passport.initialize());
  // app.use(passport.session());
  //
  //
  // app.use(express.static(config.httpServer.wwwRoot));

  var accountSchema = mongoose.Schema({
    username: String,
    password: String
  });


  var AccountModel = mongoose.model("accounts", accountSchema);

  accountRouter.route("/accounts/authenticate")
    .post( function(req, res) {

      var passwordSalt = "salt is good for you";

      function sha1(value) {
        return crypto.createHash("sha1").update(value.toString()).digest("hex");
      }

      var user = {
        id: 1,
        name: "Test User",
        username: req.body.username
      };
      //console.log(sha1(req.body.password + passwordSalt));
      req.body.password = sha1(req.body.password + passwordSalt)

      //var acct = new AccountModel(req.body);
      //
      //console.dir(acct);
      //console.dir(req.body);
      //var query = AccountModel.where(acct);
      AccountModel.find(req.body, function(err, result) {
        if (err) {
            logger.error("Account error: " + err);
            res.status(500).json(err);
            return;
        }
        else if (result.length !==1){
          logger.error("No username or password");
          res.status(401).json({msg:'Incorrect username/pass'});
          return;
        }
        req.login(result, function(err) {
          if (err) {
            console.dir(err);
            res.status(500).json(err);
            return;
          }

          csrf.secret().then(function(secret) {
            req.session.csrfSecret = secret;
            res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));
            logger.info("Success (logged in)");
            res.json(result);
          });
        });
      })
    });

  return accountRouter;

};
