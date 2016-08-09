'use strict';

const router = require('express').Router();

// use the urlFetch routes for the andpoint at /api/fetch-url
router.use('/fetch-url', require('./urlFetch/urlFetch.routes'));

module.exports = router;
