'use strict';

const _ = require('lodash');
const log = require('db.log');

const config = {
  dev: 'development',
  port: process.env.PORT || 3000,
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;

try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
}
catch(err) {
  log.error(`Error getting envConfig: ${err.stack}`);
  envConfig = {};
}

// Setup db.log logging.
process.env.loggingOff = envConfig.loggingOff || false;

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
module.exports = _.merge(config, envConfig);
