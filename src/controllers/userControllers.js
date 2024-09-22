const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//user registration
exports.registerUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        //check if the username already exist
        const existingUser = await User.findOne({username})
        if (existingUser){
            return res.status(409).json({message: "Username already exists"})
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create a new user
        const newUser = new User({username, password: hashedPassword});
        await newUser.save();
        return res.status(201).json({message: 'User registered successfully'})

    }catch(error){
        return res.status(500).json({message: 'Internal server error'})
    }
};

//User login
exports.loginUser = async (req,res) => {
    try {
        const {username, password} = req.body;
        //check if the username exists
        const existingUser = await User.findOne({username});
        if (!existingUser){
            return res.status(401).json({message: "Invalid username or password"});
        }

        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:'Invalid username or password'})
        }
        //run the node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" to get the secret key
        const token = jwt.sign({username: existingUser.username}, 'afa4fe4d36be75248d2d83f04ff31c848a7ed1ef96dd9eb79a23f93eeb071b80', {expiresIn:'1h'});
        return res.status(200).json({token});
    }catch(error){
        return res.status(500).json({message: "Internal server error"});
    }
};

//user profile management

exports.UpdateUserProfile = async(req,res) => {
    try{
        const {username} = req.params;
        const {newUsername} = req.body;

        //update the user's username
        await User.updateOne({username}, {username: newUsername});
        return res.status(200).json({message: 'User profile updated successfully'});
    }catch(error){
        return res.status(500).json({message: 'Internal server error'});
    }
};

