module.exports = function(grunt) {

  grunt.initConfig({
    httpServer: {
      rootFolder: "app/www",
      port: 8081,
      callback: function() {
        grunt.log.writeln("Web server listening on port " + this.port);
      }
    },
    mongoServer: {
      host: "localhost",
      port: 27017,
      dbName: "Nonprofit"
    },
    loggerConfig: {
      transports: {
        console: {
          level: "info",
          colorize: true,
          timestamp: true
        },
        file: {
          level: "info",
          filename: "logs/app.log",
          timestamp: true
        }
      }
    }
  });


  grunt.registerTask("webServer", "Start the web-server", function(port) {

    var
      httpServer = require("./app/http-server"),
      app = require("./app/app"),
      logger = require("./app/logger")(grunt.config("loggerConfig")),
      config = {
        webSockets: require("./app/web-sockets"),
        httpServer: grunt.config("httpServer"),
        mongoServer: grunt.config("mongoServer")
      };

    this.async();

    config.logger = logger;//Giving logger to app
    config.app = app(config);
    httpServer(config, logger);

  });

  grunt.registerTask("default", "Start web server", ["webServer"]);

};
