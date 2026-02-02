const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const HallTicket = sequelize.define('HallTicket', {
  hallTicketNumber: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  tableName: 'hall_tickets'
});

HallTicket.beforeCreate((ticket) => {
  ticket.hallTicketNumber = `HT${Date.now()}`;
});

module.exports = HallTicket;
