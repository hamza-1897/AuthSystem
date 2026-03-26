const express = require('express');
const authRouter = express.Router();
const { registerUser , getMe } = require('../controllers/auth.controller');

authRouter.post('/register',registerUser);

authRouter.get('/get-me', getMe);

module.exports = authRouter;