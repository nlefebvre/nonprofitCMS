module.exports = function(loggerConfig) {


	var
		winston = require("winston"),
		logger = new winston.Logger();

	if (loggerConfig.transports.console) {
		logger.add(winston.transports.Console, {
			level: loggerConfig.transports.console.level || "error",
			colorize: loggerConfig.transports.console.colorize || true,
			timestamp: loggerConfig.transports.console.timestamp || true
		});
	}

	if (loggerConfig.transports.file) {
		logger.add(winston.transports.File, {
			level: loggerConfig.transports.file.level || "error",
			filename: loggerConfig.transports.file.fileName || "logs/app.log",
			timestamp: loggerConfig.transports.file.timestamp || true
		});
	}

	return logger;

}
