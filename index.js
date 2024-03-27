const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();
const refreshTokenRoutes = require('./routes/tokens.js');
const authRoutes = require('./routes/auth.js');
const accessRoutes = require('./routes/access.js')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const routeFiles = readdirSync('./routes').filter(file => file !== 'tokens.js' && file !== 'auth.js' && file !== 'access.js');
routeFiles.forEach((file) => {
  if (file.endsWith('.js')) {
    const routePath = `./routes/${file}`;
    app.use('/api', require(routePath));
  }
});

app.use('/api/tokens', refreshTokenRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/access', accessRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();