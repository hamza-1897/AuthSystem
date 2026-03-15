const express = require('express');
const morgan = require('morgan');
const app = express();
const connectDB = require('../config/dbCon');
const config = require('../config/config');

const authRouter = require('../routes/auth.route');

app.use('/api/auth', authRouter);

app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});