const router = require('express').Router();
const { getRates, fetchAndStoreExchangeRates } = require('../controllers/rate');

router
  .get('/rates', getRates)
  .get('/update-rates', fetchAndStoreExchangeRates);
  
module.exports = router;
