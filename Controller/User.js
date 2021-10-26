const mongoose = require('mongoose');
const UserModel = require('../models/User');
const cloudinary = require('../Middleware/Cloudinary');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keyfile');

const userRegister = async (req, res) => {
    try {
        let usernameform = req.body.username
        let usernameNotRegistered = await validateUsername(usernameform)

        if (!usernameNotRegistered) {
            return res.status(400).json({
                messagge: 'Username is already taken',
                success: false
            })
        }

        let emailform = req.body.email
        let emailNotRegistered = await validateEmail(emailform);

        if (!emailNotRegistered) {
            return res.status(400).json({
                message: 'Email is already taken',
                success: false
            })
        }

        // Use hash password
        const password = await bcrypt.hash(req.body.password, 12);
        // Role Default 
        const roleDefault = 'user';
        // Create new user
        const newUser = new UserModel({
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            password:password,
            role: roleDefault
        })
        await newUser.save();
        return res.status(201).json({
            message: "Success, New user has registered",
            success: true,
            UserDetail: newUser
        })        
    } catch (error) {
        return res.status(500).json({
            message: "Failed, New user not registered",
            success: false,
            UserDetail: null
        }, console.log(error))
    }
}

const userLogin = async (req, res) => {
    try {        
        const userbyId = await UserModel.findOne({ username:req.body.username })
        if (!userbyId) {
            return res.status(404).json({
                message: "Failed, username does not found",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, userbyId.password)
        if (isMatch) {
            const token = jwt.sign({
                user_id:userbyId._id,
                name:userbyId.name,
                username:userbyId.username,
                email:userbyId.email,
                role:userbyId.role
            }, 
                JWT_SECRET, { expiresIn: "7 days" } 
            );

            const result = {
                username: userbyId.username,
                role: userbyId.role,
                email: userbyId.email,
                token: `Bearer ${token}`,
                expiresIn: 168
            }

            return res.status(200).json({
                message: "Congrats! You are now login",
                success: true,
                ...result,                
            })
        }
    } catch (error) {
        return res.status(401).json({
            message: "Failed",
            success: false,            
        }, console.log(error))
    }
}

// Support code

const validateUsername = async username => {
    let user = await UserModel.findOne({ username });
    return user ? false : true;
};

const validateEmail = async email => {
    let user = await UserModel.findOne({ email });
    return user ? false : true;
}

module.exports = {
    userRegister,
    userLogin
}