'use strict';

const config = require('./config/config');
const app = require('./server/server');
const log = require('db.log');

app.listen(config.port);
log.info('listening on http://localhost:' + config.port);
