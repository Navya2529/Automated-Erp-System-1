const {
  Student,
  FeeTransaction,
  Room,
  Allocation,
  Issue,
  Fine,
  Registration
} = require('../models');
const { Op, fn, col } = require('sequelize');

/**
 * ADMISSION DASHBOARD
 */
exports.admissionDashboard = async (req, res) => {
  const total = await Student.count();
  const approved = await Student.count({ where: { admissionStatus: 'APPROVED' } });
  const pending = await Student.count({ where: { admissionStatus: 'PENDING' } });

  const byCourse = await Student.findAll({
    attributes: ['course', [fn('COUNT', col('course')), 'count']],
    group: ['course']
  });

  res.json({ total, approved, pending, byCourse });
};

/**
 * FEE DASHBOARD
 */
exports.feeDashboard = async (req, res) => {
  const totalCollected = await FeeTransaction.sum('amount', {
    where: { status: 'PAID' }
  });

  const transactions = await FeeTransaction.findAll();

  res.json({
    totalCollected: totalCollected || 0,
    transactions
  });
};

/**
 * HOSTEL DASHBOARD
 */
exports.hostelDashboard = async (req, res) => {
  const rooms = await Room.findAll({ include: [Allocation] });

  const stats = rooms.map(room => ({
    roomNumber: room.roomNumber,
    capacity: room.capacity,
    occupied: room.Allocations.length
  }));

  res.json(stats);
};

/**
 * LIBRARY DASHBOARD
 */
exports.libraryDashboard = async (req, res) => {
  const issuedBooks = await Issue.count({
    where: { returnDate: null }
  });

  const pendingFines = await Fine.sum('amount', {
    where: { paid: false }
  });

  res.json({
    issuedBooks,
    pendingFines: pendingFines || 0
  });
};

/**
 * EXAM DASHBOARD
 */
exports.examDashboard = async (req, res) => {
  const registered = await Registration.count();

  const blockedStudents = await Fine.count({
    where: { paid: false }
  });

  res.json({
    registered,
    blockedStudents
  });
};
