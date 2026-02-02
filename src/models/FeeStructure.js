const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FeeStructure = sequelize.define('FeeStructure', {
  course: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'fee_structures'
});

module.exports = FeeStructure;
