function customSync(method, model, options) {
  if (!options) {
    options = {};
  }
  options.beforeSend = function(xhr) {
    xhr.setRequestHeader("X-CSRF-Token", window.csrfToken || document.cookies);
  };
  Backbone.sync.call(this, method, model, options)
    .then(function(data, status, xhr) {
      window.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
    });
}

var BaseModel = Backbone.Model.extend({
  sync: customSync,
  idAttribute: "_id"
});

var BaseCollection = Backbone.Collection.extend({
  sync: customSync
});
