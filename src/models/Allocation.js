const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Allocation = sequelize.define('Allocation', {
  allocatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'allocations'
});

module.exports = Allocation;
