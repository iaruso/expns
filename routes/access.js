const router = require('express').Router();
const { verifyAccess, refreshAccess } = require('../controllers/access.js');

router
	.get('/verify', verifyAccess)
	.post('/refresh', refreshAccess);

module.exports = router;