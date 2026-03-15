const dotenv = require('dotenv');
dotenv.config();
const config  = {
    DB_URI: process.env.DB_URL
}

module.exports = config;