module.exports = function(config, mongoose) {

  var
    express = require("express"),
    donationRouter = express.Router();



  var donationSchema = mongoose.Schema({
    amount: Number,
    cc4digits: Number,
    created: Date,
    name: String
  });


  var DonationModel = mongoose.model("donation", donationSchema);

  donationRouter.route("/donations")
  .get(function(req, res) {
    DonationModel.find({},function (err, donations){
      if (err) {
        console.log(err);
        res.status(500).json(err);
        return;
      }
      res.json(donations);
    });
  });

  donationRouter.route("/donation")
    .post(function(req, res) {
      var d = new DonationModel(req.body);
      d.save(function(err, donation){
        if (err) {
          console.log("Post error: " + err);
          res.status(500).json(err);
          return;
        }
        res.json(donation);
      });
    });

  donationRouter.route("/donation/:donationId")
  .get(function(req, res) {
    DonationModel.findById(req.params.donationId, function(err, donation){
      if (err) {
        console.log("Get error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(donation);
    });
  })
  .put(function(req, res) {
    DonationModel.findAndUpdateById(req.params.donationId, function(err, donation){
      if (err) {
        console.log("Put error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(donation);
    });
  })
  .delete(function(req, res) {
    DonationModel.findAndRemoveById(req.params.donationId, function(err, donation){
      if (err) {
        console.log("Delete error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(donation);
    });
  });

  return donationRouter;

};
