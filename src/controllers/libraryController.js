const { Book, Issue, Fine } = require('../models');

/**
 * ISSUE BOOK
 */
exports.issueBook = async (req, res) => {
  try {
    const { studentId, bookId, dueDate } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    await Issue.create({ studentId, bookId, dueDate });

    book.availableCopies -= 1;
    await book.save();

    res.json({ message: 'Book issued successfully' });
  } catch {
    res.status(500).json({ message: 'Book issue failed' });
  }
};

/**
 * RETURN BOOK
 */
exports.returnBook = async (req, res) => {
  try {
    const issue = await Issue.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.returnDate = new Date();
    await issue.save();

    const book = await Book.findByPk(issue.bookId);
    book.availableCopies += 1;
    await book.save();

    // Fine calculation
    if (issue.returnDate > issue.dueDate) {
      const daysLate =
        Math.ceil(
          (issue.returnDate - issue.dueDate) / (1000 * 60 * 60 * 24)
        );

      await Fine.create({
        issueId: issue.id,
        amount: daysLate * 5 // ₹5 per day
      });
    }

    res.json({ message: 'Book returned' });
  } catch {
    res.status(500).json({ message: 'Return failed' });
  }
};

/**
 * CHECK LIBRARY ELIGIBILITY
 */
exports.checkEligibility = async (req, res) => {
  try {
    const fines = await Fine.findAll({
      include: [{
        model: Issue,
        where: { studentId: req.params.studentId }
      }]
    });

    const totalFine = fines
      .filter(f => !f.paid)
      .reduce((sum, f) => sum + Number(f.amount), 0);

    res.json({
      examBlocked: totalFine > 0,
      pendingFine: totalFine
    });
  } catch {
    res.status(500).json({ message: 'Eligibility check failed' });
  }
};
