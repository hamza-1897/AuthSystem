const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

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

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });   


      
const token  = jwt.sign({
    id: user._id},
    config.JWT_SECRET,{
    expiresIn: '1d'
    }
);

res.status(201).json({
    message: 'User registered successfully',
    user: {
        
        username: user.username,
        email: user.email
    },
    token: token
});
       


    

};

module.exports = {
    registerUser
}
