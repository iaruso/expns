const router = require('express').Router();
const { logout } = require('../controllers/tokens.js');

router
	.delete('/', logout)

module.exports = router;