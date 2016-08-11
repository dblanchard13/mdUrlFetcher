'use strict';

const _ = require('lodash');
const j = require('j.require');
const log = require('db.log');
const request = require('request');
const q = j.require('db/queue/queue');
const UrlFetch = j.require('server/api/urlFetch/urlFetch.model');

// this defines a worker for processing queue jobs
q.process('url_fetch', (job, done) => {
  log.info(`Processing job with an id of: ${job.id}`);

  // fetch the resource from the url
  const opts = {
    url: job.data.url,
    method: 'GET',
    encoding: null,
  };

  request(opts, (err, res, body) => {
    if(err){
      log.error(`Error retrieving url for: ${job.data.url}`);
      log.error(err.stack);
    }

    // grab the mime type, status, and store the binary body as the result
    const mime_type = res.headers['content-type'];
    const status = err ? 'failed' : 'completed';
    const result = body;

    // update the record accordingly
    UrlFetch
      .update({status, result, mime_type}, {where: {id: job.id}})
      .then(done);
  });

});
