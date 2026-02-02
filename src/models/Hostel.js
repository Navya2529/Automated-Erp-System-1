const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Hostel = sequelize.define('Hostel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('BOYS', 'GIRLS'),
    allowNull: false
  }
}, {
  tableName: 'hostels'
});

module.exports = Hostel;
