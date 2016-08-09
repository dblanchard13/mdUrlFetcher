'use strict';

// use kue to create a queue using redis
const kue = require('kue');
const q = kue.createQueue();

module.exports = q;
