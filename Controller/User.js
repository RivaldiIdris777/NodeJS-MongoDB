const mongoose = require('mongoose');
const UserModel = require('../models/User');
const cloudinary = require('../Middleware/Cloudinary');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { JWT_SECRET, USEREMAIL, EMAILPASSWORD } = require('../config/keyfile');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user : 'sukiantoro11@gmail.com',
        pass : 'sukiantoro123'
    },
    tls: {
        rejectUnauthorized : false
    }
})

const loginPage = async (req, res) => {
    res.render('login')
}

const dashboard = async (req, res) => {
    res.render('dashboard');
}

const registerPage = async (req, res) => {
    res.render('register')
}

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
        // imageDefault
        const imageDefault = 'yes';
        // Create new user
        const newUser = new UserModel({
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,            
            password:password,
            role: roleDefault,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
            userImage: imageDefault,            
        })
                
        await newUser.save();

        var mailOptions = {
            from : 'sukiantoro11@gmail.com',
            to: newUser.email,
            subject: '[ Sukiantoro - Node ] - Confirmation Email',
            html: `<h2> ${newUser.name}! Thanks for registering on our site </h2>
                    <h4> Please verify your mail to continue...<h4>
                    <a href="http://${req.headers.host}/node/verify-email?token=${newUser.emailToken}">Verify your email here </a>`
        }

        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error)
            }
            else {
                console.log('Verification email is sent to your gmail account')
                res.redirect('/node/login')
            }
        })


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

const verifyEmail = async(req, res) => {
    try {
        const token = req.query.token
        const user = await UserModel.findOne({ emailToken: token })
        if(user) {
            user.emailToken = null
            user.isVerified = true
            await user.save()
            res.redirect('/node/loginUser');
        }else {
            console.log('email is not verified')
        }
    } catch (error) {
        console.log(error)
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

            return res.cookie('jwt', `Bearer ${token}`),                
                res.redirect('/node/dashboard'),
                res.status(200).json({
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

const userLogout = async (req, res) => {
    res.cookie('jwt','', { expiresIn: "1" })
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
    loginPage,
    dashboard,
    registerPage,
    verifyEmail,
    userRegister,
    userLogin,
    userLogout,
}