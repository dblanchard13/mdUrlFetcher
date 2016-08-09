'use strict';

const router = require('express').Router();
const log = require('db.log');
const controller = require('./urlFetch.controller');

// the root of all these routes is /api/fetch-url/

// run this controller action for whenever an id param is defined for these routes
router.param('id', controller.idParam);

// define the post route and linkit to the proper controller action
router.route('/')
  .post(controller.postUrl)

// define the get route and linkit to the proper controller action
router.route('/:id')
  .get(controller.getResult)

module.exports = router;
