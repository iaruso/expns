const UserToken = require('../models/userToken.js');
const { refreshTokenBodyValidation } = require('../utils/validationSchema.js');

exports.logout = async (req, res) => {
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
				.json({ error: false, message: 'Logged Out' });

		await UserToken.deleteOne({ token: req.body.refreshToken });
		
		res.status(200).json({ error: false, message: 'User Logged Out Successfully' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: 'Internal Server Error' });
	}
};