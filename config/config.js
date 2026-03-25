const dotenv = require('dotenv');
dotenv.config();
const config  = {
    DB_URI: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = config;