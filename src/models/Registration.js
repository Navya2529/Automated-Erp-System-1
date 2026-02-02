const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Registration = sequelize.define('Registration', {
  registeredAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'exam_registrations'
});

module.exports = Registration;
