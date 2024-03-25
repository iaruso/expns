const router = require('express').Router();
const UserToken = require('../models/userToken.js');
const jwt = require('jsonwebtoken');
const verifyRefreshToken = require('../utils/verifyRefreshToken.js');
const { refreshTokenBodyValidation } = require('../utils/validationSchema.js');

// Get new access token
router.post("/", async (req, res) => {
	const { error } = refreshTokenBodyValidation(req.body);
	if (error)
		return res
			.status(400)
			.json({ error: true, message: error.details[0].message });

	verifyRefreshToken(req.body.refreshToken)
		.then(({ tokenDetails }) => {
			const payload = { _id: tokenDetails._id};
			const accessToken = jwt.sign(
				payload,
				process.env.ACCESS_TOKEN_PRIVATE_KEY,
				{ expiresIn: "20m" }
			);
			res.status(200).json({
				error: false,
				accessToken,
				message: "Access token created successfully",
			});
		})
		.catch((err) => res.status(400).json(err));
});

// Logout
router.delete('/', async (req, res) => {
	try {
		const { error } = refreshTokenBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const userToken = await UserToken.findOne({ token: req.body.refreshToken });
		if (!userToken)
			return res
				.status(200)
				.json({ error: false, message: 'Logged Out Successfully' });

		await UserToken.deleteOne({ token: req.body.refreshToken });
		
		res.status(200).json({ error: false, message: 'Logged Out Successfully' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: 'Internal Server Error' });
	}
});

module.exports = router;