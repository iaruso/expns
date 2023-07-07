const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const {readdirSync} = require('fs');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const server = () => {
	db();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

server();