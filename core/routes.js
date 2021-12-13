const DEFAULT_MAX_NUM_ROUTES_TO_QUERY = 10;
const DEFAULT_FINAL_CLTV_DELTA = 144;

// expose the routes to our app with module.exports
module.exports = function factory(app, lightning, config) {
  /*
   * Creates an adapter between Express requests and Lightning gRPC requests via LightningManager.
   *
   * @param {string} methodName - the RPC call to perform on the Lightning service
   * @param {?bool} options.isLimitedToAuthorizedUser - forces request to come from an autorized
   *                                                    client
   * @param {?function} options.preHook - if present, calls the function associated with this
   *                                      variable,
   *                                      and feeds the result as parameters to the RPC call.
   * @param {?function} options.postHook - if present, calls the function associated with this
   *                                       variable, and transforms the result from the RPC call.
   *                                       This function must return a valid Object.
   */
  const lightningRPCAdapter = (methodName, options) => async (req, res) => {
    options = options || {};

    // if isLimitedToAuthorizedUser is true, we check if the `limituser` flag
    // is set on the request, and short-circuit the request if the user is not
    // authorized.
    if (options.isLimitedToAuthorizedUser && req.limituser) {
      res.sendStatus(403);
    }

    // By default, input parameters are empty. if preHook was defined, we call
    // this and use the result and input parameters
    let params = {};
    if (options.preHook) {
      params = options.preHook(req);
    }

    try {
      let response = await lightning.call(methodName, params);

      // If result needs to be manipulated before it's returned
      // to the client (because postHook is defined), call postHook
      // and use the result as payload to return via JSON
      if (options.postHook) {
        response = options.postHook(req, response);
      }
      res.json(response);
    } catch (e) {
      res.json({ error: e });
    }
  };


  app.get('/api/lnd/getnetworkinfo', lightningRPCAdapter('getNetworkInfo'));
  app.get('/api/lnd/listpeers', lightningRPCAdapter('listPeers'));
  app.get('/api/lnd/listchannels', lightningRPCAdapter('listChannels'));
  app.get('/api/lnd/pendingchannels', lightningRPCAdapter('pendingChannels'));
  app.get('/api/lnd/listpayments', lightningRPCAdapter('listPayments'));
  app.get('/api/lnd/walletbalance', lightningRPCAdapter('walletBalance'));
  app.get('/api/lnd/channelbalance', lightningRPCAdapter('channelBalance'));


  app.post('/api/lnd/newaddress', lightningRPCAdapter('newAddress', {
    isLimitedToAuthorizedUser: true,
    preHook: req => ({ type: req.body.type }),
  }));

  app.get('/api/lnd/listinvoices', lightningRPCAdapter('listInvoices', {
    preHook: (/* req */) => ({ reversed: true, num_max_invoices: 100000 }),
  }));

  app.post('/api/lnd/getnodeinfo', lightningRPCAdapter('getNodeInfo', {
    preHook: req => ({ pub_key: req.body.pubkey }),
  }));

  app.get('/api/lnd/getinfo', lightningRPCAdapter('getInfo', {
    postHook: (req, response) => {
      if ((!response.uris || response.uris.length === 0) && (config.lndAddress)) {
        response.uris = [`${response.identity_pubkey}@${config.lndAddress}`];
      }
      return response;
    },
  }));

  app.post('/api/lnd/connectpeer', lightningRPCAdapter('connectPeer', {
    isLimitedToAuthorizedUser: true,
    preHook: req => ({ addr: { pubkey: req.body.pubkey, host: req.body.host }, perm: true }),
  }));

  app.post('/api/lnd/addinvoice', lightningRPCAdapter('addInvoice', {
    isLimitedToAuthorizedUser: true,
    preHook: (req) => {
      const invoiceRequest = { memo: req.body.memo };
      if (req.body.value) {
        invoiceRequest.value = req.body.value;
      }
      if (req.body.expiry) {
        invoiceRequest.expiry = req.body.expiry;
      }
      return invoiceRequest;
    },
  }));

  app.post('/api/lnd/sendpayment', lightningRPCAdapter('sendPaymentSync', {
    isLimitedToAuthorizedUser: true,
    preHook: (req) => {
      const paymentRequest = { payment_request: req.body.payreq };
      if (req.body.amt) {
        paymentRequest.amt = req.body.amt;
      }
      return paymentRequest;
    },
  }));

  app.post('/api/lnd/decodepayreq', lightningRPCAdapter('decodePayReq', {
    isLimitedToAuthorizedUser: true,
    preHook: req => ({ pay_req: req.body.payreq }),
  }));

  app.post('/api/lnd/sendcoins', lightningRPCAdapter('sendCoins', {
    isLimitedToAuthorizedUser: true,
    preHook: req => ({ addr: req.body.addr, amount: req.body.amount }),
  }));
  
};
