const winston = require("winston");
const { LOGGER_MONGO_URI } = require("./server.config");
require("winston-mongodb");

winston.addColors({
  error: "bold red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
});

const logFormat = winston.format.printf(
  ({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  },
);

const allowedTransports = [];

allowedTransports.push(
  new winston.transports.MongoDB({
    level: "error",
    db: LOGGER_MONGO_URI,
    collection: "logs",
  })
);

const logger = winston.createLogger({
  level: "debug",
  transports: [
    ...allowedTransports,
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),

        winston.format.colorize({
          level: true,
        }),

        winston.format.padLevels(),

        logFormat,
      ),
    }),
  ],
});

module.exports = logger;
