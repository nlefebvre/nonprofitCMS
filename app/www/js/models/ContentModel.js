var Content = BaseModel.extend({
  urlRoot: "/api/content",
  defaults: {
        "Title" : null,
        "modified" : null,
        "created" : Date.now(),
        "Author" : null,
        "Category" : "none",
        "__v" : 0
    }
});
