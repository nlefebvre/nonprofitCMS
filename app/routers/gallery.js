module.exports = function(config, mongoose) {

  var
    express = require("express"),
    galleryRouter = express.Router(),
    fs = require("fs");



  var gallerySchema = mongoose.Schema({
    filename: String,
    type: String,
    image: Buffer
  });


  var GalleryModel = mongoose.model("gallery", gallerySchema);

  galleryRouter.route("/gallerys")
  .get(function(req, res) {
    GalleryModel.find({},function (err, gallerys){
      if (err) {
        console.log("Get all error:" + err);
        res.status(500).json(err);
        return;
      }
      res.json(gallerys);
    });
  });

  galleryRouter.route("/gallery")
    .post(function(req, res) {
      console.dir("request" + req);
      fs.readFile(req.files["file_0"].path, function(err, data){
        var fileMeta = {};
        fileMeta.filename = req.files["file_0"].originalname;
        fileMeta.type = req.files["file_0"].extension;
        fileMeta.data = data;
        var t = new GalleryModel(fileMeta);
        t.save(function(err, gallery){
          if(err){
            console.log("Post error:" + err);
            res.status(500).json(err);
            return;
          }
          res.json(gallery);
        });
      });
    });

  galleryRouter.route("/gallery/:galleryId")
  .get(function(req, res) {
    GalleryModel.findById(req.params.galleryId, function(err, gallery){
      if (err) {
        console.log("Get error: " + err);
        res.status(500).json(err);
        return;
      }
      //res.json(gallery);
      console.log(gallery);
       res.writeHead(200, {'Content-Type': 'image/gif' });
      //res.writeHead(200, {'Content-Type': 'application/pdf' });

      res.end(gallery.data, 'binary');

    });
  })
  .put(function(req, res) {
    GalleryModel.findAndUpdateById(req.params.galleryId, function(err, gallery){
      if (err) {
        console.log("Put error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(gallery);
    });
  })
  .delete(function(req, res) {
    GalleryModel.findAndRemoveById(req.params.galleryId, function(err, gallery){
      if (err) {
        console.log("Delete error: " + err);
        res.status(500).json(err);
        return;
      }
      res.json(gallery);
    });
  });

  return galleryRouter;

};
