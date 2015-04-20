module.exports = function(grunt) {

  grunt.initConfig({
    webServer: {
      rootFolder: "app/www",
      port: 8081,
      callback: function() {
        grunt.log.writeln("Web server listening on port " + this.port);
      }
    },
    mongoServer: {
      host: "localhost",
      port: 27017,
      dbName: "Non-profit"
    }
  });


  grunt.registerTask("webServer", "Start the web-server" function(port) {

    var
      httpServer = require("./app/http-server"),
      app = require("./app/app"),
      config = {
        webSockets: require("./app/web-sockets"),
        httpServer: grunt.config("httpServer"),
        mongoServer: grunt.config("mongoServer")
      };

    this.async();
    config.app = app(config);
    httpServer(config);

  });

  grunt.registerTask("default", "Start web server", ["webServer"]);

};
