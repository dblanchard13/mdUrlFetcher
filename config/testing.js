module.exports = {
  loggingOff: true,
  db: {
    name: 'dblanchard_massdrop_test',
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
  // allow a much smaller max file size for testing
  maxFileSize: 1000,
};
