const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken
} = require('../utils/jwt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'User inactive' });
    }

    const payload = { id: user.id, role: user.role };

    res.json({
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
    const decoded = require('jsonwebtoken').verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const payload = { id: decoded.id, role: decoded.role };

    res.json({
      accessToken: generateAccessToken(payload)
    });
  } catch {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};
