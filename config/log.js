var winston = require('winston');
const defaults = require('./defaults');

var options = {
  file: {
    level: 'info',
    filename: defaults.logfile,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const transports = [
  new winston.transports.File(options.file),
];
if(process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console(options.console)
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
}

const logger = winston.createLogger({
  level: defaults.loglevel,
  defaultMeta: { service: 'lnd-client' },
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  exitOnError: false,
  transports
});


logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;