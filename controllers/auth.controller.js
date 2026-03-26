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

        const user =  new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();


      
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


const getMe = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'token not provided' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
     
    const user = await User.findById(decoded.id)
    
    res.status(200).json({
        message : "user fetched successfully",
        user: {
            username: user.username,
            email: user.email
        }
    });

};

module.exports = {
    registerUser,
    getMe
}
