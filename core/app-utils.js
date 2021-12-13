// app/utils.js

// const debug = require('debug')('lncliweb:utils');
const logger = require('../config/log')
const defaults = require('../config/defaults');
const LightningManager = require('./lightningManager');

// TODO
module.exports = function factory(server) {
  const module = {};

  server.makeLightningManager = function mlnmgr(program) {
    const lndHost = program.lndhost || defaults.lndHost;
    const lndCertPath = program.lndCertPath || defaults.lndCertPath;
    const lndProto = program.lndProto || defaults.lndProto

    // If `disableMacaroon` is set, ignore macaroon support for the session. Otherwise
    // we read from `macarooonPath` variable and alternatively fallback to default `macaroonPath`.
    let macaroonPath = null
    if (program.disableMacaroon) {
      logger.info('Macaroon support is disabled');
    } else {
      macaroonPath = program.macaroonPath || defaults.macaroonPath;
      logger.info(`Macaroon support is enabled. ${macaroonPath}`);
    }
   
    return new LightningManager(
      lndProto,
      lndHost,
      lndCertPath,
      macaroonPath
    )
  };

  server.getURL = function geturl() {
    let port;
    if (this.useTLS) {
      port = (this.httpsPort === '443') ? '' : `:${this.httpsPort}`;
    } else {
      port = (this.serverPort === '80') ? '' : `:${this.serverPort}`;
    }
    return `http${this.useTLS ? 's' : ''}://${this.serverHost}${port}`;
  };

  return module;
};
