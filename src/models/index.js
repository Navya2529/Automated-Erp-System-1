// src/models/index.js

/* =========================
   IMPORT ALL MODELS FIRST
========================= */
const Student = require('./Student');
const FeeTransaction = require('./FeeTransaction');
const Receipt = require('./Receipt');

const Hostel = require('./Hostel');      
const Room = require('./Room');          
const Allocation = require('./Allocation'); 

const Book = require('./Book');
const Issue = require('./Issue');
const Fine = require('./Fine');

const Exam = require('./Exam');
const Registration = require('./Registration');
const HallTicket = require('./HallTicket');

/* =========================
   FEE RELATIONSHIPS
========================= */
Student.hasMany(FeeTransaction, { foreignKey: 'studentId' });
FeeTransaction.belongsTo(Student, { foreignKey: 'studentId' });

FeeTransaction.hasOne(Receipt, { foreignKey: 'feeTransactionId' });
Receipt.belongsTo(FeeTransaction, { foreignKey: 'feeTransactionId' });

/* =========================
   HOSTEL RELATIONSHIPS
========================= */

/* Hostel → Rooms */
Hostel.hasMany(Room, { foreignKey: 'hostelId' });
Room.belongsTo(Hostel, { foreignKey: 'hostelId' });

/* Room → Allocations */
Room.hasMany(Allocation, { foreignKey: 'roomId' });
Allocation.belongsTo(Room, { foreignKey: 'roomId' });

/* Student → Allocation (ONE student = ONE room) */
Student.hasOne(Allocation, { foreignKey: 'studentId' });
Allocation.belongsTo(Student, { foreignKey: 'studentId' });

/* Student → Issues */
Student.hasMany(Issue, { foreignKey: 'studentId' });
Issue.belongsTo(Student, { foreignKey: 'studentId' });

/* Book → Issues */
Book.hasMany(Issue, { foreignKey: 'bookId' });
Issue.belongsTo(Book, { foreignKey: 'bookId' });

/* Issue → Fine */
Issue.hasOne(Fine, { foreignKey: 'issueId' });
Fine.belongsTo(Issue, { foreignKey: 'issueId' });


// Exam

/* Student → Exam Registrations */
Student.hasMany(Registration, { foreignKey: 'studentId' });
Registration.belongsTo(Student, { foreignKey: 'studentId' });

/* Exam → Registrations */
Exam.hasMany(Registration, { foreignKey: 'examId' });
Registration.belongsTo(Exam, { foreignKey: 'examId' });

/* Registration → Hall Ticket */
Registration.hasOne(HallTicket, { foreignKey: 'registrationId' });
HallTicket.belongsTo(Registration, { foreignKey: 'registrationId' });


/* =========================
   EXPORT EVERYTHING
========================= */
module.exports = {
  Student,
  FeeTransaction,
  Receipt,
  Hostel,
  Room,
  Allocation,
  Book,
  Issue,
  Fine,
  Exam,
  Registration,
  HallTicket
};
