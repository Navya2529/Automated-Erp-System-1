const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING
  },
  totalCopies: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availableCopies: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'books'
});

module.exports = Book;
