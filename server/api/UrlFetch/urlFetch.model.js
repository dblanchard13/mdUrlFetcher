'use strict';

const log = require('db.log');
const j = require('j.require');
const db = j.require('db/db');
const dataTypes = require('sequelize');

// define the model with sequelize
const UrlFetch = db.define('url_fetch', {

  url: dataTypes.STRING,

  // store result as a Binary Large Object
  result: dataTypes.BLOB,

  mime_type: dataTypes.STRING,

  status: {
    type: dataTypes.STRING,

    defaultValue: 'pending',

    validate: {
      isIn: [[
        'pending',
        'completed',
        'failed'
      ]]
    }
  }
});

UrlFetch.sync().then(() => log.info('Database has been synced'));

module.exports = UrlFetch;
