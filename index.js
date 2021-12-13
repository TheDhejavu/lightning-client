const program = require('commander');

program
  .version('1.0.0')
  .option('-s, --serverport [port]', 'web server http listening port (defaults to 8280)')
  .option('-x, --httpsport [port]', 'web server https listening port (defaults to 8283)')
  .option('-h, --serverhost [host]', 'web server listening host (defaults to localhost)')
  .option('-l, --lndhost [host:port]', 'RPC lnd host (defaults to localhost:10009)')
  .parse(process.argv);

require('./core/app')(program);