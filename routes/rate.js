const router = require('express').Router();
const { getRates } = require('../controllers/rate');

router
  .get('/rates', getRates);

module.exports = router;
