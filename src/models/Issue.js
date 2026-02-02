const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Issue = sequelize.define('Issue', {
  issueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'issues'
});

module.exports = Issue;
