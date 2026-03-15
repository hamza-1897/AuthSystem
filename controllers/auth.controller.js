const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const isUserExist = await User.findOne({ 
        $or: [
            { username },
            { email }
        ]
     });

     if(isUserExist) {
        return res.status(400).json({ message: 'User already exists' });
     }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

};

module.exports = {
    registerUser
}
