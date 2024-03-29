'use strict';
require('dotenv/config');
const express = require('express');
const middlewares = require('./src/middleware');
const app = express();
const AccessControl = require('express-ip-access-control');
const glob = require('glob');
require('./src/config/db');
// custom logger 
const appLogger = require('./src/utils/logger');
global.__basedir = __dirname;
app.use(appLogger.requestDetails(appLogger));

var options = {
  mode: 'deny',
  denys: [],
  allows: ['**8.1**.1.**'],
  forceConnectionAddress: false,
  log: function (clientIp, access) {
    console.log(clientIp + (access ? ' accessed.' : ' denied.'));
  },

  statusCode: 401,
  redirectTo: '',
  message: 'Unauthorized'
};

const middleware = AccessControl(options);
app.use(middleware);

// const authenticate = require('./utils/authenticate');
app.enable('trust proxy');
middlewares(app);

/* Router setup */
const openRouter = express.Router(); // Open routes
const apiRouter = express.Router(); // Protected routes

/* Fetch router files and apply them to our routers */
glob('./src/components/*', null, (err, items) => {
  items.forEach(component => {
    if (require(component).routes) require(component).routes(
      openRouter,
      apiRouter,
    );
  });
});

// Admin Panel Routes
app.use('/v1', openRouter);
app.use('/api/v1', apiRouter);

// exporting the app
module.exports = app;
