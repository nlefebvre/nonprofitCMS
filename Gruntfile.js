module.exports = function(grunt) {

  grunt.initConfig({
    webServer: {
      rootFolder: "www",
      port: 8081
    }
  });

  grunt.registerTask("default", "Start web server", function() {

    var
      http = require("http"),
      express = require("express"),
      app = express(),
      webServerConfig = grunt.config("webServer");

    this.async();

    app.use(express.static(webServerConfig.rootFolder));

    http.createServer(app).listen(webServerConfig.port, function() {
      grunt.log.writeln("Web server listening on port " + webServerConfig.port);
    });

  });
};
