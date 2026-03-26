const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

const connectDB = require('../config/dbCon');
const config = require('../config/config');
const authRouter = require('../routes/auth.route');




app.use('/api/auth', authRouter);

app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});