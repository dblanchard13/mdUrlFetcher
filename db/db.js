'use strict';

const Sequelize = require('sequelize');
const log = require('db.log');
const j = require('j.require');
const db = j.require('config/config').db;

// create a single sequelize connection to be exported and used across the application
const sequelize = new Sequelize(db.name, db.user, db.password, db);

// make sure the database connection works
sequelize.authenticate()
  .then(() => { log.info('Database connection has been established successfully.'); })
  .catch((err) => { log.error(`Unable to connect to the database: ${err.stack}`); });

module.exports = sequelize;
