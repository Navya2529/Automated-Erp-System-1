const { FeeTransaction, Receipt } = require('../models');


/**
 * PAY FEES
 */
exports.payFees = async (req, res) => {
  try {
    const { studentId, amount, paymentMode } = req.body;

    const fee = await FeeTransaction.create({
      studentId,
      amount,
      paymentMode,
      status: 'PAID'
    });

    const receipt = await Receipt.create({
      feeTransactionId: fee.id,
      amount
    });

    res.json({
      message: 'Payment successful',
      receiptNumber: receipt.receiptNumber
    });

  } catch (error) {
    res.status(400).json({ message: 'Payment failed' });
  }
};

/**
 * CHECK FEE STATUS
 */
exports.getFeeStatus = async (req, res) => {
  try {
    const fees = await FeeTransaction.findAll({
      where: { studentId: req.params.studentId }
    });

    res.json(fees);
  } catch {
    res.status(500).json({ message: 'Error fetching fee status' });
  }
};
