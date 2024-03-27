const router = require('express').Router();
const { auth } = require('../middleware/auth.js');
const { verifyAccess } = require('../controllers/access.js');

router
	.get('/verify', auth, verifyAccess)

module.exports = router;