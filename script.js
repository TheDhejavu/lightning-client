// Load some libraries specific to this example
const async = require('async');
const _ = require('lodash');
const ByteBuffer = require('bytebuffer');
const lightning = require("./index")

let dest_pubkey = "<RECEIVER_ID_PUBKEY>";
let dest_pubkey_bytes = ByteBuffer.fromHex(dest_pubkey);

// Set a listener on the bidirectional stream
let call = lightning.sendPayment();
call.on('data', function(payment) {
  console.log("Payment sent:");
  console.log(payment);
});
call.on('end', function() {
  // The server has finished
  console.log("END");
});

// You can send single payments like this
call.write({ dest: dest_pubkey_bytes, amt: 6969 });

// Or send a bunch of them like this
function paymentSender(destination, amount) {
  return function(callback) {
    console.log("Sending " + amount + " satoshis");
    console.log("To: " + destination);
    call.write({
      dest: destination,
      amt: amount
    });
    _.delay(callback, 2000);
  };
}
let payment_senders = [];
for (let i = 0; i < 10; i++) {
  payment_senders[i] = paymentSender(dest_pubkey_bytes, 100);
}
async.series(payment_senders, function() {
  call.end();
});