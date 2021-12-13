const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bodyParser = require('body-parser');
const logger = require('../config/log')

// expose the server to our app with module.exports
module.exports = (program) => {
    const module = {};
  
    // load app default configuration data
    const defaults = require('../config/defaults');
  
    // load other configuration data
    const config = require('../config/config');
  
    // define useful global variables ======================================
    module.useTLS = program.usetls;
    module.serverPort = program.serverport || defaults.serverPort;
    module.httpsPort = module.serverPort;
    module.serverHost = program.serverhost || defaults.serverHost;

  
    // utilities functions =================
    require('./app-utils')(module);
  
    
    const lightning = module.makeLightningManager(program);
  
    // init lnd module =================
    const lnd = require('./lnd')(lightning);
  
    // app creation =================
    const app = express(); // create our app w/ express
    
    const sessionManager = session({
      secret: config.sessionSecret,
      cookie: { maxAge: config.sessionMaxAge },
      store: new MemoryStore({ checkPeriod: config.sessionMaxAge }),
      resave: true,
      rolling: true,
      saveUninitialized: true,
    })
    app.use(sessionManager);
  
    // app configuration =================
    app.use(require('./cors')); 
    app.use(bodyParser.urlencoded({ extended: 'true' })); 
    app.use(bodyParser.json()); 
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    // app.use(methodOverride());
   
    app.use((err, req, res, next) => {
        // Do logging and user-friendly error message display
        logger.error(err);
        res.status(500).send({ 
          status: 500, 
          message: 'internal error', 
          type: 'internal' 
        });
    });
  
    // init server =================
    let server;
    server = require('http').Server(app);
    const io = require('socket.io')(server);

    // setup routes =================
    require('./routes')(app, lightning, config);
  
    // listen (start app with node server.js) ======================================
    server.listen(module.serverPort, module.serverHost);
  
    logger.info(`App listening on ${module.serverHost} port ${module.serverPort}`);
  
    module.server = server;
  
    return module;
  };
  