const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const { readdirSync } = require('fs');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(auth(config));

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();