const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exam = sequelize.define('Exam', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'exams'
});

module.exports = Exam;
