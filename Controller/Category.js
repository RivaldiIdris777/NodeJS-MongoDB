const mongoose = require('mongoose');
const CategoryModel = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {
        const getCategories = await CategoryModel.find();
        return res.status(201).json({
            message: "Success get all data category",
            success: true,
            listCategories: {
                getCategories
            }
        })
        
    } catch (error) {
            return res.status(500).json({
                message: "Failed get all data categories",
                success: false,
                listCategories: null,            
            }, console.log(error)
        )
    }
}

const addCategory = async (req, res) => {
    try {
        const categoryForm = new CategoryModel({
            _id: new mongoose.Types.ObjectId(),
            nameCategory: req.body.nameCategory,
        })

        categoryForm.save();
        return res.status(201).json({
            message: "Success, Data category has saved",
            success: true,
            detailCategory: {
                categoryForm
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed, Data data category not saved",
            success: false,
            detailCategory: null
        },
        console.log(error)
        )        
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.categoryId;
        const categoryForm = {
            nameCategory: req.body.nameCategory,            
        };

        await CategoryModel.findByIdAndUpdate(id, categoryForm, { new: true})
        return res.status(201).json({
            message: "Success, Category data updated",
            success: false,
            detailCategory: {
                categoryForm
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed, Category data not updated",
            success: false,
            detailCategory: null
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.categoryId;
        
        await CategoryModel.deleteOne({ _id:id })
        return res.status(500).json({
            message: "Success, Category data deleted",
            success: false,
            detailCategory: id
        })
    } catch (error) {
        return res.status(500).json({
            message: "Success, Category data deleted",
            success: false,
            detailCategory: id
        })
    }
}


module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}