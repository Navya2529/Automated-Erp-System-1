const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* Utility to avoid duplicate users */
const createUserIfNotExists = async (email, password, role) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) return null;

  return await User.create({ email, password, role });
};

/* ADMIN */
router.post('/admin', async (req, res) => {
  try {
    const user = await createUserIfNotExists(
      'admin@test.com',
      'admin123',
      'ADMIN'
    );
    res.json({ message: user ? 'Admin created' : 'Admin already exists' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* STUDENT */
router.post('/student', async (req, res) => {
  try {
    const user = await createUserIfNotExists(
      'student@test.com',
      'student123',
      'STUDENT'
    );
    res.json({ message: user ? 'Student created' : 'Student already exists' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* LIBRARIAN */
router.post('/librarian', async (req, res) => {
  try {
    const user = await createUserIfNotExists(
      'librarian@test.com',
      'lib123',
      'LIBRARIAN'
    );
    res.json({ message: user ? 'Librarian created' : 'Librarian already exists' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* WARDEN */
router.post('/warden', async (req, res) => {
  try {
    const user = await createUserIfNotExists(
      'warden@test.com',
      'warden123',
      'WARDEN'
    );
    res.json({ message: user ? 'Warden created' : 'Warden already exists' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ACCOUNTANT */
router.post('/accountant', async (req, res) => {
  try {
    const user = await createUserIfNotExists(
      'accountant@test.com',
      'acc123',
      'ACCOUNTANT'
    );
    res.json({ message: user ? 'Accountant created' : 'Accountant already exists' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
