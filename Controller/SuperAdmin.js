const mongoose = require('mongoose');
const passport = require('passport');
const UserModel = require('../models/User');
const ProductModel = require('../models/Product');
const CategoryModel = require('../models/Category');
const bcrypt = require('bcrypt');

// Support code
const checkAuth = passport.authenticate("jwt", { session: false });

const checkRole = roles => (req, res, next) => 
    !roles.includes(req.user.role)
    ? res.status(401).json({
        message: "The page you want to access doesnt exist",
        success: false
    })
    : next();

// Support code 

// Manage user
const getAllUser = async (req, res) => {
    try {
        const getDataUser = await ProductModel.find()
        return res.status(201).json({
            message: "Success, superadmin get all data user",
            success: true,
            listAllUser: {
                getDataUser
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed, superadmin not get all data user",
            success: false,
            listAllUser: null
        }, console.log(error)
        
        )
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.userId;

        const password = await bcrypt.hash(req.body.password);
        
        const userForm = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            username: req.body.username,
            password: password,
            userImage: req.body.userImage,
            cloudinary_id: cld.public_id
        };

        await UserModel.findByIdAndUpdate(id, userForm, { new: true})
        return res.status(201).json({
            message: "Success, user data has updated",
            success: true,
            detailUser: {
                userForm
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: "Failed, user not updated",
            success: false,
            detailUser: {
                userForm
            }
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;

        await UserModel.deleteOne({ _id:id })
        return res.status(201).json({
            message: "Success, User data deleted",
            success: true,
            detailUser: id
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed, User data not deleted",
            success: false,
            detailUser: id
        })
    }
}
// Manage Product


module.exports = {
    checkAuth,
    checkRole,
    getAllUser,
    updateUser,
    deleteUser
}