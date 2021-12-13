// config/defaults.js

module.exports = {
  serverPort: 8280,
  serverHost: 'localhost',
  lndProto: `${__dirname}/../proto/lightning.proto`,
  lndHost: 'localhost:10001',
  lndCertPath: `/Users/ayodejiakinola/Library/Application Support/Lnd/tls.cert`,
  macaroonPath: `/Users/ayodejiakinola/go/dev/alice/data/chain/bitcoin/simnet/admin.macaroon`,
  loglevel: 'info',
  logfile: `${__dirname}/../logs/lndclient.log`,
  lndLogFile: `${require('os').homedir()}/.lnd/logs/bitcoin/testnet/lnd.log`,
};
