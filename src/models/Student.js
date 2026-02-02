const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Student = sequelize.define('Student', {
  studentId: {
    type: DataTypes.STRING,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE
  },
  gender: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  course: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.INTEGER
  },
  admissionStatus: {
    type: DataTypes.ENUM('PENDING', 'APPROVED'),
    defaultValue: 'PENDING'
  }
}, {
  tableName: 'students'
});

/* Auto-generate studentId like STU1001 */
Student.beforeCreate(async (student) => {
  const count = await Student.count();
  student.studentId = `STU${1000 + count + 1}`;
});

module.exports = Student;
