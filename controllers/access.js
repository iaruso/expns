const jwt = require('jsonwebtoken');

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
