'use strict';

const _ = require('lodash');
const j = require('j.require');
const log = require('db.log');
const request = require('superagent');
const q = j.require('db/queue/queue');
const UrlFetch = j.require('server/api/urlFetch/urlFetch.model');

// this defines a worker for processing queue jobs
q.process('url_fetch', (job, done) => {
  log.info(`Processing job with an id of: ${job.id}`);

  // fetch the resource from the url
  request
    .get(job.data.url)
    .buffer(true)
    .end((err, res) => {
      if(err){
        log.error(`Error retrieving url for: ${job.data.url}`);
        log.error(err.stack);
      }

      // grab the mime type, status, and parse where the binary result is stored depending on the type
      const mime_type = res.headers['content-type'];
      const status = err ? 'failed' : 'completed';
      const result = parseResultBasedOnType(mime_type, res);

      // update the record accordingly
      UrlFetch
        .update({status, result, mime_type}, {where: {id: job.id}})
        .then(done);
    });


  const parseResultBasedOnType = (type, result) => {
    const primaryType = type.split('/').shift();

    const textTypes = ['text', 'application', 'video'];
    if(_.includes(textTypes, primaryType)){ return result.text; }

    const bodyTypes = ['audio', 'image'];
    if(_.includes(bodyTypes, primaryType)){ return result.body; }

    return result;
  };
});
