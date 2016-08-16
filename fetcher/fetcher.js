'use strict';

const j = require('j.require');
const log = require('db.log');
const request = require('request');
const q = j.require('db/queue/queue');
const config = j.require('config/config');
const UrlFetch = j.require('server/api/urlFetch/urlFetch.model');

log.info('Fetcher initialized');

// this defines a worker for processing queue jobs
q.process('url_fetch', processUrlFetchJob);

function processUrlFetchJob(job, done){
  log.info(`Processing job with an id of: ${job.id}`);

  const url = job.data.url;
  const opts = { url, encoding: null };

  // use a head request to retrieve headers without requesting the body of the resource
  request.head(opts, (err, headRes) => {
    const mime_type = headRes.headers['content-type'];
    let size = headRes.headers['content-length'];

    // the content length header isn't always provided, but if it is we can save ourselves time and resources by exiting out immediately
    if(size > config.maxFileSize){
      log.error('The resource requested was greater than the maximum size allowed.');
      updateUrlFetch(job.id, 'failed', mime_type, null, done);
      return;
    }

    size = 0;

    request.get(opts, (err, res, body) => {
        if(err){
          log.error(`Error retrieving url for: ${url}`);
          log.error(err.stack);
        }
        // if the request successfully completes without going over the size - update the job with the coplete response
        const status = err ? 'failed' : 'completed';
        updateUrlFetch(job.id, status, mime_type, body, done);
      })
      // using an old school function declaration so I have access to the correct 'this'
      .on('data', function(data){
        // increment the size as data arrives
        size += data.length;
        log.info(`Retrieved data with a length of ${data.length}`);

        // if the total size becomes bigger than the max allowed size - update the job with a failed status and abort the request
        if(size > config.maxFileSize){
          log.error('The resource requested was greater than the maximum size allowed.');
          updateUrlFetch(job.id, 'failed', mime_type, null, done);

          this.abort();
        }
      });
  });
};

function updateUrlFetch(id, status, mime_type, result, cb){
  UrlFetch
    .update({status, mime_type, result}, {where: { id }})
    .then(cb);
};

// export function for testing
module.exports = { processUrlFetchJob };
