const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Fine = sequelize.define('Fine', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'fines'
});

module.exports = Fine;
