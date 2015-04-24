var ContactUsView = Backbone.View.extend({

  render: function() {
    //this.$el.html("<p>home ^_^</p>");
    this.$el.html(templates["contactUs"]({}));
  },

  initialize: function(options) {
    this.options = options;
  }


});
