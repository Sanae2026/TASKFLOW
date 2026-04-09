require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('ERROR: La variable PORT no está definida en .env');
}

module.exports = {
  PORT: process.env.PORT,
};
