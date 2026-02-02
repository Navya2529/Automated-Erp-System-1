const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FeeTransaction = sequelize.define('FeeTransaction', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'PAID'),
    defaultValue: 'PENDING'
  },
  paymentMode: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'fee_transactions'
});

module.exports = FeeTransaction;
