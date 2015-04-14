module.exports = function(grunt) {

  grunt.initConfig({
    webServer: {
      rootFolder: "www",
      port: 8081
    }
  });


  grunt.registerTask("webServer", function(port) {

    var
      webServer = require("./web-server"),
      webServerConfig = grunt.config("webServer");

    this.async();

    webServerConfig.port = port || webServerConfig.port;
    console.log(webServerConfig.port);

    webServer(webServerConfig,  function() {
      grunt.log.writeln("Web server listening on port " + webServerConfig.port);
    });

  });

  grunt.registerTask("default", "Start web server", ["webServer"]);

};
