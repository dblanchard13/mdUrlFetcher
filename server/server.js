'use strict';

const express = require('express');
const app = express();
const api = require('./api/api');
const log = require('db.log');

// initialize the database connection
require('../db/db');

// setup the app middlware
require('./middleware/middleware')(app);

// setup the api to start with the root path of /api
app.use('/api', api);

// set up global error handling
app.use((err, req, res, next) => {
  log.error(`Error caught by global handling in server root ${err.stack}`);
  res.status(500).send('Oops');
});

module.exports = app;
