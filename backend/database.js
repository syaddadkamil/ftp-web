const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('file_db', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Unable to connect:', err));

module.exports = sequelize;
