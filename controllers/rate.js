const axios = require('axios');
const { MongoClient } = require('mongodb');
const cron = require('node-cron');

const mongoURL = process.env.MONGO_URL;
const dbName = 'test';
const collectionName = 'rates';

const accessKey = process.env.ACCESS_KEY;
const baseCurrencies = ['EUR', 'USD', 'GBP'];

async function fetchAndStoreExchangeRates() {
  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

		const otherCurrencies = baseCurrencies.filter((currency) => currency !== 'EUR');
		const apiUrl = `http://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}&symbols=${otherCurrencies.join()}&format=1`;

		const response = await axios.get(apiUrl);
		console.log(response.data);
		const { base, rates } = response.data;

		const filteredRates = {};
		for (const currency of otherCurrencies) {
			filteredRates[currency] = rates[currency];
		}

		await collection.updateOne(
			{ base },
			{ $set: { rates: filteredRates } },
			{ upsert: true }
		);

    client.close();
    console.log('Exchange rates updated successfully!');
  } catch (error) {
    console.error('Error fetching and storing exchange rates:', error.message);
  }
}

cron.schedule('00 00 00 * * *', () => fetchAndStoreExchangeRates());

async function getRates(req, res) {
  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const rates = await collection.find().toArray();
    client.close();

    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exchange rates.' });
  }
}

module.exports = { getRates };