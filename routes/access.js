const router = require('express').Router();
const { auth } = require('../middleware/auth.js');
const { verifyAccess, refreshAccess } = require('../controllers/access.js');

router
	.get('/verify', auth, verifyAccess)
	.post('/refresh', refreshAccess);

module.exports = router;