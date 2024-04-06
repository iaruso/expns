const jwt = require('jsonwebtoken');
const UserToken = require('../models/userToken.js')

exports.verifyAccess = async (req, res) => {
  const token = req.header('x-access-token');
  if (!token) {
    return res.status(403).json({ error: true, message: 'Access Denied: No token provided' });
  }
  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    if (Date.now() >= tokenDetails.exp * 1000) {
      return res.status(401).json({ error: true, message: 'Access token has expired' });
    }
    req.user = tokenDetails;
    res.status(200).json({ success: true, message: 'Access granted' });
  } catch (err) {
    res.status(403).json({ error: true, message: 'Access Denied: Invalid token' });
  }
};

exports.refreshAccess = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ error: true, message: 'Refresh token is missing' });
  }
  try {
    const tokenDetails = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    const accessToken = jwt.sign({ userId: tokenDetails.userId }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '30m' });
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: true, message: 'Invalid refresh token' });
  }
};