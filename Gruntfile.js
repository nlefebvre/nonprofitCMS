module.exports = function(grunt) {

  grunt.initConfig({
    webServer: {
      rootFolder: "www",
      port: 8081
    }
  });

  grunt.registerTask("default", "Start web server", function() {

    var
      webServer = require("./web-server"),
      webServerConfig = grunt.config("webServer");

    this.async();

    webServer(webServerConfig,  function() {
      grunt.log.writeln("Web server listening on port " + webServerConfig.port);
    });

  });
};
