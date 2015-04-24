var ContentsView = Backbone.View.extend({

  render: function() {
    var that = this;
    console.log("Fetching... conetns");

    this.collection.fetch({
      success: function() {
        console.log("success conetns");
        console.dir(that);

        that.$el.html(templates["contents"]({contents: that.collection.toJSON ()}));
      }
    });
  },
  initialize: function(options) {
    this.options = options;
  }


});
