const {
  Exam,
  Registration,
  HallTicket,
  FeeTransaction,
  Fine,
  Issue
} = require('../models');

/**
 * CHECK ELIGIBILITY
 */
const checkEligibility = async (studentId) => {
  // Fee check
  const paidFee = await FeeTransaction.findOne({
    where: { studentId, status: 'PAID' }
  });

  if (!paidFee) return false;

  // Library dues check
  const fines = await Fine.findAll({
    include: [{
      model: Issue,
      where: { studentId }
    }]
  });

  const pendingFine = fines.some(f => !f.paid);
  return !pendingFine;
};

/**
 * REGISTER FOR EXAM
 */
exports.registerExam = async (req, res) => {
  try {
    const { studentId, examId } = req.body;

    const eligible = await checkEligibility(studentId);
    if (!eligible) {
      return res.status(403).json({
        message: 'Not eligible for exam (fees/library dues)'
      });
    }

    const alreadyRegistered = await Registration.findOne({
      where: { studentId, examId }
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered' });
    }

    const registration = await Registration.create({
      studentId,
      examId
    });

    const hallTicket = await HallTicket.create({
      registrationId: registration.id
    });

    res.json({
      message: 'Exam registered successfully',
      hallTicketNumber: hallTicket.hallTicketNumber
    });

  } catch {
    res.status(500).json({ message: 'Exam registration failed' });
  }
};

/**
 * GET HALL TICKET
 */
exports.getHallTicket = async (req, res) => {
  try {
    const ticket = await HallTicket.findOne({
      include: [{
        model: Registration,
        where: { studentId: req.params.studentId }
      }]
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Hall ticket not found' });
    }

    res.json(ticket);
  } catch {
    res.status(500).json({ message: 'Error fetching hall ticket' });
  }
};
