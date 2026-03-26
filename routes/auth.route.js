const express = require('express');
const authRouter = express.Router();
const { registerUser,refreshToken , getMe } = require('../controllers/auth.controller');

authRouter.post('/register',registerUser);

authRouter.get('/get-me', getMe);

authRouter.get('/refresh-token', refreshToken);

module.exports = authRouter;