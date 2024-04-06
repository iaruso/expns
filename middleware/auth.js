const jwt = require('jsonwebtoken');
const axios = require('axios');
const UserToken = require('../models/userToken.js');

exports.auth = async (req, res, next) => {
	const token = req.header("x-access-token");
	if (!token) {
		return res.status(403).json({ error: true, message: "Access Denied: No token provided" });
	}

	try {
		const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
		req.user = tokenDetails;
		next();
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			try {
				const refreshToken = req.header("x-refresh-token");
				if (!refreshToken) throw new Error("Refresh token is missing");
				const userToken = await UserToken.findOne({ token: refreshToken });
				if (!userToken) {
					return res.status(403).json({ error: true, message: 'Invalid refresh token' });
				}
				const response = await axios.post('https://expns-api.vercel.app/api/access/refresh', { refreshToken });
				const { accessToken } = response.data;
				res.set('x-access-token', accessToken);
				const tokenDetails = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
				req.user = tokenDetails;
				next();
			} catch (refreshError) {
				console.error(refreshError);
				return res.status(403).json({ error: true, message: "Access Denied: Token expired and refresh failed" });
			}
		} else {
			console.error(err);
			return res.status(403).json({ error: true, message: "Access Denied: Invalid token" });
		}
	}
};
