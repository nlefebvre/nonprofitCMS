module.exports = function(config, mongoose) {

  var
    express = require("express"),
    contentRouter = express.Router();



  var contentSchema = mongoose.Schema({
    Title: String,
    modified: Date,
    created: Date,
    Author: String,
    Category: String
  });


  var contentModel = mongoose.model("content", contentSchema);

  contentRouter.route("/contents")
  .get(function(req, res) {
    contentModel.find({},function (err, contents){
      if (err) {
        console.log("Get all error:" + err);
        res.status(500).json(err);
        return;
      }
      res.json(contents);
    });
  });

  contentRouter.route("/content")
    .post(function(req, res) {
      var d = new contentModel(req.body);
      d.save(function(err, content){
        if (err) {
          console.log("Post error: " + err);
          res.status(500).json(err);
          return;
        }
        res.json(content);
      });
    });

  contentRouter.route("/content/:contentId")
  .get(function(req, res) {
    contentModel.findById(req.params.contentId, function(err, content){
      if (err) {
        console.log("Get error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(content);
    });
  })
  .put(function(req, res) {
    contentModel.findAndUpdateById(req.params.contentId, function(err, content){
      if (err) {
        console.log("Put error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(content);
    });
  })
  .delete(function(req, res) {
    contentModel.findAndRemoveById(req.params.contentId, function(err, content){
      if (err) {
        console.log("Delete error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(content);
    });
  });

  return contentRouter;

};
