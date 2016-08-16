# Url Fetcher

------------

## Requirements
  - Redis
    `brew install redis`

  - PostgreSQL with a database named dblanchard_massdrop (the name can be changed in ./config/development.js)
    `brew install postgresql` &&
    `createdb dblanchard_massdrop`

  - Node version 4+
    Can be downloaded [here](https://nodejs.org/en/)

  - NPM
    Is packaged with Node so you should be fine on that

  - pm2
    can be installed with the following command:
      `npm install pm2 -g`

## Starting the API and Fetcher Worker
  - First cd into the repo and run:
    `npm install`
  
  - Then run the following commands in separate terminal windows:
    `npm start`

## Stopping the API and Fetcher Worker
  - Run the following from inside the repo:
    `npm stop`

## Interacting with the API
  - I chose to use http pie which can be installed with the following command:
    `brew install httpie`

  - And then you can run the following command to post urls:
    `http POST localhost:3000/api/fetch-url/ url=http://google.com`

  - And to check the status/results
    `http localhost:3000/api/fetch-url/YOUR_RETURNED_JOB_ID`

  - Alternativley, you can visit the folllwing address in your browser to view the content:
    `http://localhost:3000/api/fetch-url/YOUR_RETURNED_JOB_ID`
