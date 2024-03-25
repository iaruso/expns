const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();
const refreshTokenRoutes = require("./routes/refreshToken.js");
const authRoutes = require("./routes/auth.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const routeFiles = readdirSync('./routes').filter(file => file !== 'refreshToken.js' && file !== 'auth.js');
routeFiles.forEach((file) => {
  if (file.endsWith('.js')) {
    const routePath = `./routes/${file}`;
    app.use('/api', require(routePath));
  }
});

app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", authRoutes);

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