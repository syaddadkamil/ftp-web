const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const File = sequelize.define('File', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();
module.exports = File;
