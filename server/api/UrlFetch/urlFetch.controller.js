'use strict';

const UrlFetch = require('./urlFetch.model');
const j = require('j.require');
const q = j.require('db/queue/queue');
const _ = require('lodash');
const log = require('db.log');

exports.idParam = (req, res, next, id) => {
  // fetch the necessary fields for the result
  UrlFetch
    .findById(id, {attributes: ['id', 'status', 'result', 'mime_type']})
    .then((result) => {
      if(!result){
        res.end('No result with that id');
        return;
      }

      // attach result to the request object
      req.result = result;
      next();
    })
    .catch((err) => {
      log.error(`Error in the idParam endpoint: ${err.stack}`)
      next(err);
    });
};

exports.getResult = (req, res, next) => {
  // send back the status if the job hasn't completed successfully
  const status = req.result.status;
  if(status !== 'completed'){
    res.json({ status });
    return;
  }

  // send the binary stored by the db back to the client with the correct content-type header
  res.type(req.result.mime_type).end(req.result.result);
};

exports.postUrl = (req, res, next) => {
  // grab the record off the parsed request body, this should just be a url as defined by the api
  // any fields not defined by the model will be ignored
  const record = req.body;

  // queue up a new job
  const job = q.create('url_fetch', record)
    .save((err) => {
      if(err){
        log.error(`Error in the postUrl endpoint while trying to add a new job to the queue: ${err.stack}`);
        next(err);
        return;
      }

      // assign the job id to the new record
      record.id = job.id;

      // create the record
      UrlFetch
        .create(record)
        .then((result) => {
          // return the record id to the user for reference
          res.json({ id: record.id });
        })
        .catch((err) => {
          log.error(`Error in the postUrl endpoint while trying to save a new Url Fetch Record: ${err.stack}`);
          next(err);
        });
    });
};
