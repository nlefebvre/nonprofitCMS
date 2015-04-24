var AppRouter = Backbone.Router.extend({


  routes:{
    "" : "showHome",
    "donations" : "showDonations",
    "donation/:donationId": "showDonation",
    "contents" : "showContents",
    "content/contentId" : "showContents",
    "contact": "showContact",
    "login" : "login"
  },
  resetView: function(){
    if (this.currentView) {
      this.currentView.undelegateEvents();
    }
  },
  showCollection: function(ViewType, viewCollection) {
    this.currentView = new ViewType({
      collection: new viewCollection(),
      // passing the element passed into the router
      el: this.options.el,
      // give view access to the router to navigate in response to events
      router: this
    });
    console.dir(this.currentView);
    this.currentView.render();
  },
  showView: function(ViewType){
    this.currentView = new ViewType({
      // passing the element passed into the router
      el: this.options.el,
      // give view access to the router to navigate in response to events
      router: this
    });
    console.dir(this.currentView);
    this.currentView.render();
  },
  showHome: function(){
    this.resetView();
    this.showView(HomePageView);
  },
  showDonations: function(){
    console.log("donations route");
    this.resetView();
    this.showCollection(DonationsView, Donations);
  },
  showDonation: function(id){
    this.resetView();
    this.showView(DonationView);
  },
  showContents: function(){
    this.resetView();
    this.showCollection(ContentsView, Contents);
  },
  showContent: function(id){
    this.resetView();
    this.showView(ContentView);
  },
  showContact: function(){
    this.resetView();
    console.log("contact us route");
    this.showView(ContactUsView);
  },
  showLogin: function(){
    this.resetView();
    this.showView(LoginView);
  },
  initialize: function(options) {
    this.options = options;
  }
});
