const router = require('express').Router();
const { register, login } = require('../controllers/auth.js');

router
	.post('/register', register)
	.post('/login', login)

module.exports = router;