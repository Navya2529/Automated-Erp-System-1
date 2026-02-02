const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Receipt = sequelize.define('Receipt', {
  receiptNumber: {
    type: DataTypes.STRING,
    unique: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'receipts'
});

Receipt.beforeCreate((receipt) => {
  receipt.receiptNumber = `RCPT${Date.now()}`;
});

module.exports = Receipt;
