module.exports = function(grunt) {

  var
    path = require("path");

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
    },
    handlebars: {
      compile: {
        options: {
          namespace: "templates",
          processName: function(filePath) {
            return path.basename(filePath, ".min.hbs");
          },
          processPartialName: function(filePath) {
            return path.basename(filePath, ".min.hbs");
          }
        },
        files: {
          "app/www/js/templates.js": "app/templates-min/**/*.min.hbs"
        }
      }
    },
    htmlmin: {
      templates: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: 'app/templates',
        src: '*.hbs',
        dest: 'app/templates-min/',
        ext: ".min.hbs"
      }
    },
    watch: {
      templates: {
        files: ["app/templates/**/*.hbs"],
        tasks: ["htmlmin", "handlebars"],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");

  grunt.registerTask("webServer", "Start the web-server", function(port) {

    var
      httpServer = require("./app/http-server"),
      app = require("./app/app"),
      logger = global.logger = require("./app/logger")(grunt.config("loggerConfig")),
      config = {
        webSockets: require("./app/web-sockets"),
        httpServer: grunt.config("httpServer"),
        mongoServer: grunt.config("mongoServer")
      };

    //This cannot be async with watch
    //this.async();

    logger.info("starting app...");
    config.app = app(config);
    httpServer(config, logger);

  });

  grunt.registerTask("default", "Start web server", ["htmlmin","handlebars","webServer","watch"]);

  //grunt.registerTask("login", "Start web server", ["htmlmin","handlebars","webServer","watch"]);

};
