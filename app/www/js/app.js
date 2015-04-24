"use strict";


window.addEventListener("DOMContentLoaded", function() {


  var appRouter = new AppRouter({
		el: $("#view-content")[0]
	});
  Backbone.history.start({ pushState: false });

  $("#donationsButton").on("click", function(){
    console.log("donation clicked");
    appRouter.navigate("/donations", {trigger:true})
  });
  $("#homeButton").on("click", function(){
    console.log("home clicked");
    appRouter.navigate("/", {trigger:true})
  });
  $("#contentsButton").on("click", function(){
    console.log("contents clicked");
    appRouter.navigate("/contents", {trigger:true})
  });
  $("#contactButton").on("click", function(){
    console.log("contact us clicked");
    appRouter.navigate("/contact", {trigger:true})
  });

});
//
// $("#homeButton").on("click", function(){
//   appRouter.navigate("/", {trigger:true})
// });
// $("#menuButton").on("click", function(){
//   appRouter.navigate("/menu", {trigger:true})
// });
// $("#greensButton").on("click", function(){
//   appRouter.navigate("/menu/greens", {trigger:true})
// });
//




function MyWebSocket(webSocketServerURL) {

  this.connected = new Promise(function(resolve, reject) {
    var ws = new WebSocket(webSocketServerURL);
    ws.addEventListener("open", function() {
      resolve(ws);
    });
  });
}

MyWebSocket.prototype.sendObject = function(obj) {
  this.connected.then(function(ws) {
    ws.send(JSON.stringify(obj));
  });
};

MyWebSocket.prototype.onReceiveObject = function(callbackFn) {
  this.connected.then(function(ws) {
    ws.addEventListener("message", function(message) {
      callbackFn(JSON.parse(message.data));
    });
  });
};

MyWebSocket.prototype.on = function(eventName, callbackFn) {
  this.connected.then(function(ws) {
    ws.addEventListener(eventName, callbackFn);
  });
};

MyWebSocket.prototype.off = function(eventName, callbackFn) {
  this.connected.then(function(ws) {
    ws.removeEventListener(eventName, callbackFn);
  });
};

function LoggingWebSocket(webSocketServerURL) {
  LoggingWebSocket.prototype._super.call(this, webSocketServerURL);
}
LoggingWebSocket.prototype = Object.create(MyWebSocket.prototype);
LoggingWebSocket.prototype.constructor = LoggingWebSocket;
LoggingWebSocket.prototype._super = MyWebSocket;
LoggingWebSocket.prototype.sendLogMessage = function(logMessage) {
  this.sendObject({
    messageType: "log",
    message: "log: " + logMessage
  });
};
LoggingWebSocket.prototype.sendErrMessage = function(logMessage) {
  this.sendObject({
    messageType: "error",
    message: "logErr: " + logMessage
  });
};


var lws = new LoggingWebSocket("ws://localhost:8081");

lws.onReceiveObject(function(o) {
  console.log("Received status: " + o.status);
});

lws.sendErrMessage("user logged in - lws");
lws.sendLogMessage("user logged out - lws");
lws.sendLogMessage("error occurred - lws");
