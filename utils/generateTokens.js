const jwt = require('jsonwebtoken');
const UserToken = require('../models/userToken.js');

const generateTokens = async (user) => {
	try {
		const payload = { _id: user._id, roles: user.roles };
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: '1m' }
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			{ expiresIn: '30d' }
		);

		await UserToken.deleteOne({ userId: user._id });

		await new UserToken({ userId: user._id, token: refreshToken }).save();
		return { accessToken, refreshToken };
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = generateTokens;
