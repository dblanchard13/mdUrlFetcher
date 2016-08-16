module.exports = {
  loggingOff: false,
  db: {
    name: 'dblanchard_massdrop',
    user: '',
    password: '',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  // example max file size of 1 million bytes
  maxFileSize: 1000000000,
};
