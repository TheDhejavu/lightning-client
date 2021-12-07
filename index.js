const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const fs = require("fs");

// Due to updated ECDSA generated tls.cert we need to let gprc know that
// we need to use that cipher suite otherwise there will be a handhsake
// error when we communicate with the lnd rpc server.
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'

// We need to give the proto loader some extra options, otherwise the code won't
// fully work with lnd.
const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
const packageDefinition = protoLoader.loadSync('rpc.proto', loaderOptions);

//  Lnd cert is at ~/.lnd/tls.cert on Linux and
//  ~/Library/Application Support/Lnd/tls.cert on Mac
let lndCert = fs.readFileSync("~/.lnd/tls.cert");
let credentials = grpc.credentials.createSsl(lndCert);
let lnrpcDescriptor = grpc.loadPackageDefinition(packageDefinition);
let lnrpc = lnrpcDescriptor.lnrpc;
let lightning = new lnrpc.Lightning('localhost:10009', credentials);


// Get Lightning Info
lightning.getInfo({}, function(err, response) {
    if (err) {
      console.log('Error: ' + err);
    }
    console.log('GetInfo:', response);
});

// Response Streaming RPC
let call = lightning.subscribeInvoices({});
call.on('data', function(invoice) {
    console.log(invoice);
})
.on('end', function() {
  // The server has finished sending
})
.on('status', function(status) {
  // Process status
  console.log("Current status" + status);
});


module.exports.lightning = lightning