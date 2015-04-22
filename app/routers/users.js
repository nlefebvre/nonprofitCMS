module.exports = function(config, mongoose) {

  var
    express = require("express"),
    passport = require("passport"),
    crypto = require("crypto"),
    accountRouter = express.Router();


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
            console.log("Account error: " + err);
            res.status(500).json(err);
            return;
        }
        //  else if (result.length !==1){
        //   console.log("No username or password");
        //   res.json();
        //   return;
        // }
        req.login(result, function(err) {

          if (err) {
            console.dir(err);
            res.status(500).json(err);
            return;
          }
          console.log("Success");
          res.json(result);
        });
        //res.json(result);
      })
    });
    // .post(, function(req, res, next) {
    //
    //     var passwordSalt = "salt is good for you";
    //
    //     var user = {
    //       id: 1,
    //       name: "Test User",
    //       username: req.body.username
    //     };
    //
    //     function sha1(value) {
    //       return crypto.createHash("sha1").update(value.toString()).digest("hex");
    //     }
    //
    //     console.log(sha1(req.body.password + passwordSalt));
    //
    //
    //     req.login(user, function(err) {
    //
    //       if (err) {
    //         console.dir(err);
    //         res.status(500).json(err);
    //         return;
    //       }
    //
    //       res.json(user);
    //     });
    //
    //   });





  return accountRouter;

};
