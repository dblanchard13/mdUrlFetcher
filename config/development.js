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
};
